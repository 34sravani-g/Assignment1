def calculate_discount(cart_total, product_quantities):
    discount_rules = {
        "flat_10_discount": (cart_total > 200, 10),
        "bulk_5_discount": (any(qty > 10 for qty in product_quantities), 5),
        "bulk_10_discount": (sum(product_quantities) > 20, 10),
        "tiered_50_discount": (sum(product_quantities) > 30 and any(qty > 15 for qty in product_quantities), 50)
    }

    applicable_discounts = {rule: discount for rule, (condition, discount) in discount_rules.items() if condition}

    if not applicable_discounts:
        return None, 0

    best_discount_rule = max(applicable_discounts, key=applicable_discounts.get)
    return best_discount_rule, applicable_discounts[best_discount_rule]


def calculate_cost(product_name, quantity, unit_price, is_gift_wrapped):
    product_amount = quantity * unit_price
    gift_wrap_fee = 1 if is_gift_wrapped else 0
    return product_name, quantity, product_amount, gift_wrap_fee

def main():
    products = {
        "Product A": 20,
        "Product B": 40,
        "Product C": 50
    }

    quantities = []
    is_gift_wrapped = []

    for product_name, unit_price in products.items():
        quantity = int(input(f"Enter quantity for {product_name}: "))
        quantities.append(quantity)
        gift_wrap = input(f"Is {product_name} wrapped as a gift? (yes/no): ").lower() == 'yes'
        is_gift_wrapped.append(gift_wrap)

    subtotal = 0
    for i, (product_name, unit_price) in enumerate(products.items()):
        name, qty, amount, gift_wrap_fee = calculate_cost(product_name, quantities[i], unit_price, is_gift_wrapped[i])
        subtotal += amount
        print(f"{name}: Quantity={qty}, Amount={amount}, Gift Wrap Fee={gift_wrap_fee}")

    total_quantity = sum(quantities)
    discount_rule, discount_amount = calculate_discount(subtotal, quantities)

    if discount_rule:
        print(f"\nDiscount Applied: {discount_rule}, Amount={discount_amount}")

    shipping_fee = (total_quantity // 10) * 5
    total = subtotal - discount_amount + shipping_fee + sum(is_gift_wrapped)

    print(f"\nSubtotal: {subtotal}")
    print(f"Shipping Fee: {shipping_fee}")
    print(f"Total: {total}")

if __name__ == "__main__":
    main()

