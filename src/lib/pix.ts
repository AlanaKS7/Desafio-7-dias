export function generatePixPayload(pixKey: string, merchantName: string, merchantCity: string, txid: string = '***', amount: string | null = null): string {
  const ID_PAYLOAD_FORMAT_INDICATOR = "00";
  const ID_POINT_OF_INITIATION_METHOD = "01";
  const ID_MERCHANT_ACCOUNT_INFORMATION = "26";
  const ID_MERCHANT_ACCOUNT_INFORMATION_GUI = "00";
  const ID_MERCHANT_ACCOUNT_INFORMATION_KEY = "01";
  const ID_MERCHANT_CATEGORY_CODE = "52";
  const ID_TRANSACTION_CURRENCY = "53";
  const ID_TRANSACTION_AMOUNT = "54";
  const ID_COUNTRY_CODE = "58";
  const ID_MERCHANT_NAME = "59";
  const ID_MERCHANT_CITY = "60";
  const ID_ADDITIONAL_DATA_FIELD_TEMPLATE = "62";
  const ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = "05";
  const ID_CRC16 = "63";

  function getValue(id: string, value: string): string {
    const size = String(value.length).padStart(2, '0');
    return id + size + value;
  }

  const gui = getValue(ID_MERCHANT_ACCOUNT_INFORMATION_GUI, "br.gov.bcb.pix");
  const key = getValue(ID_MERCHANT_ACCOUNT_INFORMATION_KEY, pixKey);
  const accountInfo = getValue(ID_MERCHANT_ACCOUNT_INFORMATION, gui + key);

  let payload = getValue(ID_PAYLOAD_FORMAT_INDICATOR, "01") +
                getValue(ID_POINT_OF_INITIATION_METHOD, "11") + // 11 means static QR code
                accountInfo +
                getValue(ID_MERCHANT_CATEGORY_CODE, "0000") +
                getValue(ID_TRANSACTION_CURRENCY, "986");

  if (amount) {
    payload += getValue(ID_TRANSACTION_AMOUNT, amount);
  }

  payload += getValue(ID_COUNTRY_CODE, "BR") +
             getValue(ID_MERCHANT_NAME, merchantName) +
             getValue(ID_MERCHANT_CITY, merchantCity);

  const txidValue = getValue(ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, txid);
  payload += getValue(ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txidValue);

  payload += ID_CRC16 + "04";

  // Calculate CRC16
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  crc = crc & 0xFFFF;
  const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');

  return payload + crcHex;
}
