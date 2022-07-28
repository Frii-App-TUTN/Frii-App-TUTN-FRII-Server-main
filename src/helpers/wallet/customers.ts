const https = require('https')

exports.createCustomer = async (firstName: string, lastName: string, emailAddress: string, phoneNumber: string, callback: any) => {
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
    let data = '';
    const req = await https.request(options, (res: any) => {

        res.on('data', (chunk: any) => {
            data += chunk
        });

        res.on('end', async () => {
            data = await JSON.parse(data);
            callback(data)
        })
    }).on('error', (error: any) => {
        console.error(error)
    })

    req.write(params)
    req.end();
};