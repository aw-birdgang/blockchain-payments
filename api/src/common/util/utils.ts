import { BigNumberish, formatUnits, parseUnits } from "ethers";
import { Logger } from "@nestjs/common";
import { EtherService } from "../../api/ether/ether.service";

export function getVariableName<TResult>(getVar: () => TResult): string {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
  );
  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }
  const fullMemberName = m[1];
  const memberParts = fullMemberName.split('.');
  return memberParts[memberParts.length - 1];
}

export function convertFormatUnits(amount: BigNumberish): string {
  return formatUnits(amount);
}

export function convertParseUnits(amount: string): bigint {
  return parseUnits(amount, 18);
}
