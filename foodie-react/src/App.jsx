import { useState } from "react";

const foods = [
  { id: 1, name: "Pizza", price: 199, image: "🍕", description: "Delicious cheese pizza" },
  { id: 2, name: "Burger", price: 129, image: "🍔", description: "Fresh and tasty burger" },
  { id: 3, name: "Biryani", price: 249, image: "🍛", description: "Special chicken biryani" },
  { id: 4, name: "Noodles", price: 149, image: "🍜", description: "Hot spicy noodles" },
  { id: 5, name: "Sandwich", price: 99, image: "🥪", description: "Fresh vegetable sandwich" },
  { id: 6, name: "Ice Cream", price: 79, image: "🍨", description: "Delicious ice cream" }
];

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);

  const signup = () => {
    if (!user || !email || !password) {
      alert("Please fill all details");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ user, email, password }));
    alert("Signup successful!");
    setPage("login");
  };

  const login = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      alert("Login successful!");
      setPage("food");
    } else {
      alert("Invalid email or password. Please signup first.");
    }
  };

  const addToCart = (food) => {
    setCart([...cart, food]);
    alert(food.name + " added to cart!");
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#fff3e8",
      fontFamily: "Arial",
      textAlign: "center",
      padding: "25px"
    },
    box: {
      background: "white",
      padding: "25px",
      borderRadius: "12px",
      maxWidth: "400px",
      margin: "40px auto",
      boxShadow: "0 3px 12px #ccc"
    },
    input: {
      padding: "12px",
      margin: "10px",
      width: "85%",
      border: "1px solid #ccc",
      borderRadius: "6px"
    },
    button: {
      padding: "12px 20px",
      margin: "8px",
      background: "#e85d04",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    },
    card: {
      display: "inline-block",
      background: "white",
      width: "200px",
      padding: "15px",
      margin: "12px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px #ccc"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#e85d04" }}>🍽️ Foodie</h1>
      <h3>Online Food Delivery System</h3>

      {page === "login" && (
        <div style={styles.box}>
          <h2>Login</h2>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button style={styles.button} onClick={login}>Login</button>
          <p>Don't have an account?</p>
          <button style={styles.button} onClick={() => setPage("signup")}>
            Signup
          </button>
        </div>
      )}

      {page === "signup" && (
        <div style={styles.box}>
          <h2>Create Account</h2>
          <input
            style={styles.input}
            placeholder="Enter Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button style={styles.button} onClick={signup}>Create Account</button>
          <p>Already have an account?</p>
          <button style={styles.button} onClick={() => setPage("login")}>
            Back to Login
          </button>
        </div>
      )}

      {page === "food" && (
        <>
          <h2>Welcome to Foodie!</h2>
          <h3>Available Food Items</h3>

          {foods.map((food) => (
            <div style={styles.card} key={food.id}>
              <h1>{food.image}</h1>
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <h3>₹{food.price}</h3>
              <button style={styles.button} onClick={() => addToCart(food)}>
                Add to Cart
              </button>
            </div>
          ))}

          <br />
          <button style={styles.button} onClick={() => setPage("cart")}>
            🛒 View Cart ({cart.length})
          </button>
          <button style={styles.button} onClick={() => setPage("login")}>
            Logout
          </button>
        </>
      )}

      {page === "cart" && (
        <div style={styles.box}>
          <h2>🛒 My Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cart.map((item, index) => (
              <div key={index}>
                <p>{item.image} {item.name} - ₹{item.price}</p>
                <button
                  style={styles.button}
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))
          )}

          <h2>Total: ₹{total}</h2>

          <button style={styles.button} onClick={() => setPage("food")}>
            Continue Shopping
          </button>
          <button
            style={styles.button}
            onClick={() => {
              if (cart.length > 0) {
                alert("Order placed successfully!");
                setCart([]);
              }
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}