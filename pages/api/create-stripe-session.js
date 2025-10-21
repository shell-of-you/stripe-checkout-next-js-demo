import Stripe from "stripe"
import cors from "../../lib/cors"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
})

export default async function handler(req, res) {
    await cors(req, res)

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    if (req.method !== "POST") {
        res.setHeader("Allow", "POST")
        return res.status(405).end("Method Not Allowed")
    }

    try {
        const { cartItems } = req.body

        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                unit_amount: Math.round(item.price * 100),
                product_data: {
                    name: item.name,
                    images: [item.image],
                    description: item.size ? `Size: ${item.size}` : undefined,
                },
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items,
            shipping_address_collection: {
                // 🌍 Разрешаем оплату из всех стран
                allowed_countries: [
                    "US", "CA", "GB", "AU", "NZ", "DE", "FR", "IT", "ES", "PT",
                    "PL", "NL", "BE", "CH", "AT", "SE", "NO", "DK", "FI", "IE",
                    "CZ", "SK", "HU", "SI", "HR", "GR", "RO", "BG", "EE", "LV",
                    "LT", "JP", "KR", "SG", "HK", "AE", "SA", "IL", "TR", "IN",
                    "BR", "MX", "AR", "CL", "TH", "VN", "MY", "PH", "ZA", "EG",
                    "RU", "UA", "KZ"
                ],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: "International Shipping",
                        type: "fixed_amount",
                        fixed_amount: { amount: 1500, currency: "usd" }, // $15 доставка
                        delivery_estimate: {
                            minimum: { unit: "business_day", value: 7 },
                            maximum: { unit: "business_day", value: 21 },
                        },
                    },
                },
            ],
            success_url: "https://shellofyou.framer.website",
cancel_url: "https://shellofyou.framer.website",

        })

        res.status(200).json({ id: session.id })
    } catch (err) {
        console.error("Stripe session error:", err)
        res.status(500).json({ error: err.message })
    }
}
