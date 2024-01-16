function calculateDiscount(cartTotal, productQuantities) {
    const discountRules = {
        flat_10_discount: cartTotal > 200 ? 10 : 0,
        bulk_5_discount: productQuantities.some(qty => qty > 10) ? 5 : 0,
        bulk_10_discount: productQuantities.reduce((acc, qty) => acc + qty, 0) > 20 ? 10 : 0,
        tiered_50_discount: productQuantities.reduce((acc, qty) => acc + (qty > 15 ? 1 : 0), 0) > 0 && productQuantities.some(qty => qty > 15) ? 50 : 0
    };

    const applicableDiscounts = Object.entries(discountRules).filter(([rule, amount]) => amount > 0);

    if (applicableDiscounts.length === 0) {
        return [null, 0];
    }

    const [bestDiscountRule, discountAmount] = applicableDiscounts.reduce((max, discount) => (discount[1] > max[1] ? discount : max), applicableDiscounts[0]);

    return [bestDiscountRule, discountAmount];
}

function calculateCost(productName, quantity, unitPrice, isGiftWrapped) {
    const productAmount = quantity * unitPrice;
    const giftWrapFee = isGiftWrapped ? 1 : 0;
    return [productName, quantity, productAmount, giftWrapFee];
}

function main() {
    const products = {
        "Product A": 20,
        "Product B": 40,
        "Product C": 50
    };

    const quantities = [];
    const isGiftWrapped = [];

    for (const [productName, unitPrice] of Object.entries(products)) {
        const quantity = parseInt(prompt(`Enter quantity for ${productName}: `), 10);
        quantities.push(quantity);
        const giftWrap = prompt(`Is ${productName} wrapped as a gift? (yes/no): `).toLowerCase() === 'yes';
        isGiftWrapped.push(giftWrap);
    }

    let subtotal = 0;
    for (let i = 0; i < Object.keys(products).length; i++) {
        const [name, qty, amount, giftWrapFee] = calculateCost(Object.keys(products)[i], quantities[i], Object.values(products)[i], isGiftWrapped[i]);
        subtotal += amount;
        console.log(`${name}: Quantity=${qty}, Amount=${amount}, Gift Wrap Fee=${giftWrapFee}`);
    }

    const totalQuantity = quantities.reduce((acc, qty) => acc + qty, 0);
    const [discountRule, discountAmount] = calculateDiscount(subtotal, quantities);

    if (discountRule) {
        console.log(`\nDiscount Applied: ${discountRule}, Amount=${discountAmount}`);
    }

    const shippingFee = Math.floor(totalQuantity / 10) * 5;
    const total = subtotal - discountAmount + shippingFee + isGiftWrapped.reduce((acc, wrap) => acc + (wrap ? 1 : 0), 0);

    console.log(`\nSubtotal: ${subtotal}`);
    console.log(`Shipping Fee: ${shippingFee}`);
    console.log(`Total: ${total}`);
}

main();
