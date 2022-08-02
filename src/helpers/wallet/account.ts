const https = require('https')
type callback = (err: boolean, data: any) => void;
exports.createAccount = async (customerId: number, callback: callback) => {
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
exports.createCustomer = async (firstName: string, lastName: string, emailAddress: string, phoneNumber: string, callback: callback) => {
    const params = JSON.stringify({
        "email": emailAddress,
        "first_name": firstName,
        "last_name": lastName,
        "phone": phoneNumber
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/customer',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    }
    const req = await https.request(options, (res: any) => {
        let data = '';

        res.on('data', (chunk: any) => {
            data += chunk
        });

        res.on('end', async () => {
            data = await JSON.parse(data);
            callback(false, data);
        })
    }).on('error', (error: any) => {
        callback(true, error);
    })

    req.write(params)
    req.end();
};
exports.fetchAccount = async (accountId:number,callback:callback) => {
    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/dedicated_account/${accountId}`,
        method: 'GET',
        headers: {
            Authorization: 'Bearer SECRET_KEY'
        }
    }

   await https.request(options, (res:any) => {
        let data = ''

        res.on('data', (chunk:any) => {
            data += chunk
        });

        res.on('end', () => {
            data = JSON.parse(data);
            callback(false,data);
        })
    }).on('error', (error:any) => {
        callback(true, error);
    })
};