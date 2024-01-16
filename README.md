## Steps for above task 

Defining Discount Rules: Creating discount rules based on cart total and product quantities using an object.

Calculate Applicable Discounts: Checking which discount rules are applicable based on the defined conditions.

Apply Best Discount: Selecting the discount rule with the highest amount if multiple rules are applicable.

Calculating Product Costs: Iterating through products, calculate individual product costs, and accumulate the subtotal.

Displaying Results: Logging product details, applied discount, shipping fee, and total cost to the console.


output:

Enter quantity for Product A: 50
Is Product A wrapped as a gift? (yes/no): yes
Enter quantity for Product B: 70
Is Product B wrapped as a gift? (yes/no): yes
Enter quantity for Product C: 60
Is Product C wrapped as a gift? (yes/no): yes
Product A: Quantity=50, Amount=1000, Gift Wrap Fee=1
Product B: Quantity=70, Amount=2800, Gift Wrap Fee=1
Product C: Quantity=60, Amount=3000, Gift Wrap Fee=1

Discount Applied: tiered_50_discount, Amount=50

Subtotal: 6800
Shipping Fee: 90
Total: 6843
