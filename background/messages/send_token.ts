import type { PlasmoMessaging } from "@plasmohq/messaging"

import { Tx } from "../tx"

export const handler: PlasmoMessaging.MessageHandler<
  {
    from: string
    to: string
    amount: string
    fee: number
    memo?: string
    token: Cw20Token
  },
  { isOk: boolean }
> = async (req, res) => {
  const tx = await Tx.init("local")

  const result = await tx.sendToken(req.body)

  res.send({
    isOk: result && result.transactionHash ? true : false
  })
}
