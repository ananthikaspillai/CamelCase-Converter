var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ShoppingCartImplementation = /** @class */ (function () {
    function ShoppingCartImplementation() {
        this.items = [];
        this.discountRules = [
            { category: "electronics", minimumAmount: 1000, percentage: 15, stackable: false },
            { category: "books", minimumAmount: 50, percentage: 10, stackable: true },
            { minimumAmount: 500, percentage: 5, stackable: true }
        ];
    }
    ShoppingCartImplementation.prototype.validateQuantity = function (quantity) {
        return quantity > 0 && Number.isInteger(quantity);
    };
    ShoppingCartImplementation.prototype.validatePrice = function (price) {
        return price >= 0;
    };
    ShoppingCartImplementation.prototype.addItem = function (item) {
        if (!this.validateQuantity(item.quantity)) {
            throw new Error("Invalid quantity");
        }
        if (!this.validatePrice(item.price)) {
            throw new Error("Invalid price");
        }
        var existingItem = this.items.find(function (i) { return i.id === item.id; });
        if (existingItem) {
            existingItem.quantity += item.quantity;
            console.log("Updated quantity for ".concat(existingItem.name, " to ").concat(existingItem.quantity));
        }
        else {
            this.items.push(__assign({}, item));
            console.log("Added ".concat(item.name, " to cart"));
        }
    };
    ShoppingCartImplementation.prototype.removeItem = function (id, quantity) {
        console.log("Attempting to remove item with ID: ".concat(id));
        var itemIndex = this.items.findIndex(function (item) { return item.id === id; });
        if (itemIndex === -1) {
            console.log("Item with ID ".concat(id, " not available"));
            return;
        }
        var item = this.items[itemIndex];
        if (quantity && quantity < item.quantity) {
            item.quantity -= quantity;
            console.log("Reduced quantity of item ".concat(item.name, " to ").concat(item.quantity));
        }
        else {
            this.items.splice(itemIndex, 1);
            console.log("Item ".concat(item.name, " removed from cart."));
        }
        console.log("Updated cart:", this.items);
    };
    ShoppingCartImplementation.prototype.updateQuantity = function (id, quantity) {
        if (!this.validateQuantity(quantity)) {
            throw new Error("Invalid quantity");
        }
        var item = this.items.find(function (item) { return item.id === id; });
        if (item) {
            item.quantity = quantity;
            console.log("Updated ".concat(item.name, " quantity to ").concat(quantity));
        }
        else {
            console.log("Item with ID ".concat(id, " not available"));
        }
        console.log("Updated cart:", this.items);
    };
    ShoppingCartImplementation.prototype.calculateTotal = function () {
        var subtotal = this.items.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
        var appliedDiscounts = [];
        var totalDiscount = 0;
        var categoryTotals = this.getItemsByCategory();
        for (var _i = 0, _a = this.discountRules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (rule.category) {
                var categoryItems = categoryTotals[rule.category] || [];
                var categoryTotal = categoryItems.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
                if (categoryTotal >= (rule.minimumAmount || 0)) {
                    var discount = categoryTotal * (rule.percentage / 100);
                    if (rule.stackable) {
                        totalDiscount += discount;
                        appliedDiscounts.push("".concat(rule.percentage, "% off ").concat(rule.category, " items (-$").concat(discount.toFixed(2), ")"));
                    }
                    else if (discount > totalDiscount) {
                        totalDiscount = discount;
                        appliedDiscounts.length = 0;
                        appliedDiscounts.push("".concat(rule.percentage, "% off ").concat(rule.category, " items (-$").concat(discount.toFixed(2), ")"));
                    }
                }
            }
        }
        var totalWeight = this.items.reduce(function (sum, item) { return sum + (item.weightInKg || 0) * item.quantity; }, 0);
        var shipping = Math.max(50, totalWeight * 10);
        var total = subtotal - totalDiscount + shipping;
        return {
            subtotal: Number(subtotal.toFixed(2)),
            discount: Number(totalDiscount.toFixed(2)),
            shipping: Number(shipping.toFixed(2)),
            total: Number(total.toFixed(2)),
            appliedDiscounts: appliedDiscounts
        };
    };
    ShoppingCartImplementation.prototype.getItemsByCategory = function () {
        return this.items.reduce(function (acc, item) {
            var _a;
            (acc[_a = item.category] || (acc[_a] = [])).push(item);
            return acc;
        }, {});
    };
    return ShoppingCartImplementation;
}());
try {
    var cart = new ShoppingCartImplementation();
    cart.addItem({
        id: 1,
        name: "Laptop",
        price: 999.99,
        quantity: 1,
        category: "electronics",
        discountable: true,
        weightInKg: 2.5
    });
    cart.addItem({
        id: 2,
        name: "Programming Books Bundle",
        price: 79.99,
        quantity: 1,
        category: "books",
        discountable: true,
        weightInKg: 1.5
    });
    console.log("\nCart Contents:");
    console.log(cart.items);
    console.log("\nOrder Summary:");
    console.log(cart.calculateTotal());
    console.log("\nItems by Category:");
    console.log(cart.getItemsByCategory());
    cart.removeItem(1);
    console.log("\nUpdated Cart:");
    console.log(cart.items);
}
catch (error) {
    if (error instanceof Error) {
        console.error("Error:", error.message);
    }
}
