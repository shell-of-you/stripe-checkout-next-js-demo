import { useEffect, useState } from "react"

export default function SuccessPage() {
    const [items, setItems] = useState([])

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        setItems(cart)
        localStorage.removeItem("cart") // очищаем корзину
    }, [])

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "#f9f9f9",
                padding: "40px 20px",
                fontFamily: "Inter, sans-serif",
                textAlign: "center",
            }}
        >
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                ✅ Thank you for your order!
            </h1>

            {items.length > 0 ? (
                <div
                    style={{
                        background: "white",
                        borderRadius: "16px",
                        boxShadow: "0 0 20px rgba(0,0,0,0.05)",
                        padding: "24px",
                        width: "100%",
                        maxWidth: "420px",
                    }}
                >
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                        You purchased:
                    </h2>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottom: "1px solid #eee",
                                padding: "10px 0",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                                <div style={{ textAlign: "left" }}>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            fontSize: "15px",
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                    {item.size && (
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                color: "#777",
                                            }}
                                        >
                                            Size: {item.size}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                style={{
                                    fontWeight: 500,
                                    fontSize: "14px",
                                }}
                            >
                                × {item.quantity}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: "#777", marginTop: "1rem" }}>
                    Your order has been placed successfully.
                </p>
            )}

            <button
                onClick={() => (window.location.href = "https://shellofyou.framer.website")}
                style={{
                    marginTop: "2rem",
                    padding: "12px 28px",
                    borderRadius: "14px",
                    background: "black",
                    color: "white",
                    fontSize: "15px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Back to shop
            </button>
        </div>
    )
}
