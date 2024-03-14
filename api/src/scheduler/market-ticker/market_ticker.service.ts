import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

// Entities
import { Market_Ticker } from '../../entities';

/**
 * 현재 블록체인 거래소에서 거래되는 토큰들의 현재가를 등록한다.
 */
@Injectable()
export class MarketTickerService {
  private readonly logger = new Logger(MarketTickerService.name);

  processing = false;
  processTimer;

  constructor(
    private readonly http: HttpService,
    private readonly commonService: CommonService,
    @InjectRepository(Market_Ticker)
    private MarketTickerRepository: Repository<Market_Ticker>,
  ) {
    this.main();
  }

  async main() {
    try {
      // Binance Coin Ticker 획득 및 업데이트 (5초 간격)
      await this.updateBinanceExchangeTicker();
      this.processTimer = setInterval(async () => {
        await this.updateBinanceExchangeTicker();
      }, 5 * 1000);

      // Coinmarketcap USDT/USDC Ticker 획득 및 업데이트 (1시간 간격)
      setInterval(async () => {
        await this.updateCoinmarketcapExchangeTicker();
      }, 60 * 1000);
    } catch (e) {
      this.logger.error(e);
    }
  }

  /* Binance Coin Ticker 획득 및 업데이트 */
  async updateBinanceExchangeTicker() {
    //const binanceTickerUrl = 'https://api.binance.com/api/v3/ticker/price';
    const binanceTickerUrl =
      'https://api.binance.com/api/v3/ticker?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22TRXUSDT%22,%22BUSDUSDT%22,%22MATICUSDT%22,%22BNBUSDT%22,%22QNTUSDT%22,%22THETAUSDT%22,%22LINKUSDT%22,%22APEUSDT%22,%22SANDUSDT%22,%22UNIUSDT%22,%22JSTUSDT%22,%22SUNUSDT%22]';

    const response = await axios({
      method: 'GET',
      url: binanceTickerUrl,
    }).catch(() => {
      throw new ForbiddenException('API not available');
    });

    let logData = '';
    for (let i = 0; i < response.data.length; i++) {
      const symbol = response.data[i].symbol.replace('USDT', '');
      logData += symbol + ' : ' + response.data[i].lastPrice + ', ';

      const market_Ticker = new Market_Ticker();
      market_Ticker.exchange = 'binance';
      market_Ticker.symbol = symbol;
      market_Ticker.ticker = response.data[i].lastPrice;
      market_Ticker.ticker_percent = response.data[i].priceChangePercent;

      await this.MarketTickerRepository.save(market_Ticker);
    }

    this.logger.log(logData.substring(0, logData.length - 2));
  }

  /* Coinmarketcap USDT/USDC Ticker 획득 및 업데이트 */
  async updateCoinmarketcapExchangeTicker() {
    const date_ob = new Date();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const cmcTickerUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=USDT,USDC';
    const API_KEY = process.env.Coinmarketcap_Api_Key;

    try {
      if (hours % 1 == 0 && minutes == 0) {
        const response = await axios.get(cmcTickerUrl, {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
          },
        });
        const {
          data: { USDT, USDC },
        } = response.data;
        const dataList = [USDT, USDC];

        const tickerData = dataList.reduce((acc, v) => {
          const quoteInfo = v.quote.USD;
          const dataObj = {
            symbol: v.symbol,
            ticker: quoteInfo.price,
            ticker_percent: quoteInfo.percent_change_24h,
          };
          acc.push(dataObj);

          return acc;
        }, []);

        let logData = '';
        for (const item of tickerData) {
          logData += item.symbol + ' : ' + item.ticker + ', ';
          const fixedTicker = Math.floor(item.ticker * 10000) / 10000;
          let fixedTickerPercent;
          if (item.ticker_percent < 0) {
            fixedTickerPercent = Math.ceil(item.ticker_percent * 1000) / 1000;
          } else {
            fixedTickerPercent = Math.floor(item.ticker_percent * 1000) / 1000;
          }

          const market_Ticker = new Market_Ticker();
          market_Ticker.exchange = 'coinmarketcap';
          market_Ticker.symbol = item.symbol;
          market_Ticker.ticker = fixedTicker;
          market_Ticker.ticker_percent = fixedTickerPercent;

          await this.MarketTickerRepository.save(market_Ticker);
        }

        this.logger.log(logData.substring(0, logData.length - 2));
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}
