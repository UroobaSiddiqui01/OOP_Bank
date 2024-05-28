import inquirer from "inquirer";
;
// Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful.  Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // cresit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    // check balance
    checBalance() {
        console.log(`Current balance:$${this.balance}`);
    }
}
// customer class
class customer {
    firstName;
    lastName;
    gendar;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobilNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gendar = gender;
        this.age = age;
        this.mobileNumber = mobilNumber;
        this.account = account;
    }
}
// creat bank accounts
const accounts = [
    new BankAccount(1002, 500),
    new BankAccount(1003, 1000),
    new BankAccount(1004, 2000),
];
// create customars
const customers = [
    new customer('Hamza', 'Khan', 'Malr', 35, 3154698798, accounts[0]),
    new customer('urooba', 'Siddiqui', 'Femalr', 30, 3484698755, accounts[1]),
    new customer('minahil', 'Ali', 'Femalr', 22, 3334699798, accounts[2])
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcom, ${customer?.firstName} ${customer?.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Desposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Withdraw:"
                    });
                    customer.account.withdraw(WithdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. please try again.");
        }
    } while (true);
}
service();
