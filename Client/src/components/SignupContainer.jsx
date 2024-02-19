import React from "react";

function SignupContainer() {
  return (
    <div class="signup-container">
      <form action="/newuser" method="POST">
        <p>Full Name</p>
        <input
          class="signup-input"
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
        />
        <p>Email</p>
        <input
          class="signup-input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <p>Set a PIN</p>
        <input
          class="signup-input"
          type="password"
          name="password"
          id="password"
          placeholder="Enter a PIN"
        />
        <p>Current Balance</p>
        <input
          class="signup-input"
          type="number"
          name="balance"
          id="balance"
          placeholder="Enter your current Balance"
        />
        <button type="submit" class="signup-btn">
          &rarr;
        </button>
      </form>
    </div>
  );
}

export default SignupContainer;
