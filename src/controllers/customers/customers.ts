const https = require('https')
import axios from 'axios';
exports.createCustomer = async (callback: any) => {
    
    const result = await axios(
        {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/customer',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    }
    )
    // const params = JSON.stringify({
    //     "email": "customer@email.com",
    //     "first_name": "Zero",
    //     "last_name": "Sum",
    //     "phone": "+2348123456789"
    // })

    // const options = {
    //     hostname: 'api.paystack.co',
    //     port: 443,
    //     path: '/customer',
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    //         'Content-Type': 'application/json'
    //     }
    // }
    // let data = '';
    // const req =  await https.request (options, (res:any) => {

    //     res.on('data', (chunk:any) => {
    //         data += chunk
    //     });

    //     res.on('end', async () => {
    //         data = await JSON.parse(data);
    //         callback(data)
    //     })
    // }).on('error', (error:any) => {
    //     console.error(error)
    // })

    // req.write(params)
    // req.end();
    // console.log("end")
}