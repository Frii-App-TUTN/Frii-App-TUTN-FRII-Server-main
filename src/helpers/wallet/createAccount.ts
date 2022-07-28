type callback = (err: boolean, data: any) => void;
exports.createAccount = async (customerId: number, callback:callback) => {
                           const params = JSON.stringify({
                            "preferred_bank": "access-bank",
                            "customer": customerId
                        })

                        const options = {
                            hostname: 'api.paystack.co',
                            port: 443,
                            path: '/dedicated_account',
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                                'Content-Type': 'application/json'
                            }
                        }

                        const req = await https.request(options, (res: any) => {
                            let data: any = '';
                            res.on('data', (chunk: any) => {
                                data += chunk
                            });
                            res.on('end', () => {
                                data = JSON.parse(data);
                                callback(false, data);
                            })
                        }).on('error', (error: any) => {
                                // res.status(502).json({
                                //     error: true,
                                //     message: error.message,
                                // });
                            callback(true, error);
                        })

                        req.write(params)
                        req.end()
}