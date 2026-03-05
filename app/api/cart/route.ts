import { NextResponse } from "next/server";

export async function GET() {
  const cartItems = [
    {
      id: 1,
      name: "Eco-friendly Bamboo Toothbrush",
      desc: "Pack of 4 • Medium Bristles",
      price: 50,
      quantity: 1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAROFI4wyWubyVEwqHLEJNZulheVVejbFtZCCVstegA0t_dg5bKmCP6LARuZdovGM3DIKgZinpTHZeCOr4D0pzhqh3hrMGl1-VU1KvCPv1QkuRh4Qdhw63hy7p9NYHfVXRf3BUWOCSVnu4JYQiy5BHUwvFActYSoR3M4Y66ZG8UY_-SWs1hlblB6aONl_4eI0UUyPBgfKnwqoTKgTP7RkP2Gqojxp7VGWOE9eBjmZdlpr43DOn-toIM6LMjyMWrQfwpqpRLAAuHP4cS",
    },
    {
      id: 2,
      name: "Reusable Cotton Produce Bags",
      desc: "Set of 6 • Natural Unbleached",
      price: 62,
      quantity: 1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4qR4G3EkBqnYMH5NqEG4HBSxoQaj7K1bgqLPB_k4exlPc8LLPZrLcaAJY-A8Vkc9rnbOvP4AyUsCFquXI6M7i7lJZVCGUtBzmkWPQH5XTSnqg_K-Sg8fwYeZCPuXrbA93MsLd0kZ-tCx0WhQ8ZR5HEfMGNsKpNUhTF1PVZ2j7M9hQifJhrCoAMS29honn0M978_R5juC2lXWTRLYul7AKqY4XBTvZYpPjsSX-yjcrTQ9x0F8_-tdxouboN_3Tt5EZJwlLgwswJolJ",
    },
  ];

  return NextResponse.json({
    cartItems,
    shippingFee: 20,
    discount: 0,
  });
}
