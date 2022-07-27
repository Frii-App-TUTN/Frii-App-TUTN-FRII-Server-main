import { Response, Request } from "express";
import { verifyBank } from "../../helpers/Account/VerifyBank";
import { verifyCard } from "../../helpers/Account/VerifyCard";
import { AccountDetail } from "../../models/AccountDetail";

exports.storeAccount = async (req: Request, res: Response) => {
  const { type, cardNumber, createdBy, accountNumber, bankCode } = req.body;
  if (type === "card") {
    const response = await verifyCard(cardNumber.slice(0, 6));
    if (response.status) {
      //save card details
      let account = new AccountDetail({
        type,
        cardNumber,
        createdBy,
        cardBrand: response.data.brand,
        bankName: response.data.bank,
      });
      await account.save();
      return res.status(200).json({
        error: false,
        message: "Card verified",
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "Card not verified",
      });
    }
  } else {
    const response = await verifyBank(accountNumber, bankCode);
    if (response.status) {
      let account = new AccountDetail({
        type,
        cardNumber,
        accountName: response.data.account_name,
        createdBy,
        accountNumber,
        bankCode,
      });
      await account.save();
      return res.status(200).json({
        error: false,
        message: "Bank verified",
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "Bank not verified",
      });
    }
  }
};

exports.deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.body;
  await AccountDetail.findByIdAndDelete(id);
  return res.status(200).json({
    error: false,
    message: "Account deleted",
  });
};
