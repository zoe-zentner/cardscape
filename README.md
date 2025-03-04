# Cardscape

Cardscape is a card collection game where users can collect and manage their cards, purchase new ones from different categories, and track their progress. Each user has a personal collection of cards that they can view, with the card's ownership status reflected in its color (greyscale for cards they don’t own).

## Demo

Images coming soon!

## About The Game

Cardscape allows users to collect cards from various categories, manage their collection, and use in-game currency to purchase more cards. Cards are displayed on the user’s home screen, and their ownership status is indicated by the color of the card. If the card is owned, it’s colored; if not, it appears in greyscale.

### Features:
- **Login**: Users can log in to their account for personalized gameplay.
- **Home Screen**: Displays owned cards in color and non-owned cards in greyscale. The amount of in-game currency (coins) is displayed at the top of the screen.
- **Card Purchase**: Users can buy a random card from a category for one coin.
- **Category Selection**: Users can click on a category from the scroll bar to quickly view the cards in that category.
- **Currency System**: Users spend coins to buy cards and can see how many coins they have at the top of the screen.

## Technologies Used

- **React Native**: For building the mobile interface and user experience.
- **TypeScript**: For maintaining the type safety of the project.
- **SQLite3**: For managing user data, card collections, and in-game purchases.
- **JavaScript**: For implementing the game logic, handling user interactions, and managing the flow of the application.

## Installation

To run Cardscape locally, follow the steps below:

### 1. Clone the repository:
```bash
git clone https://github.com/zoe-zentner/rn-cards.git
```
### 2. Install dependencies:
```bash
cd rn-cards
npm install
```

### 3. Run the app:
```bash
npm start
```

You can also follow the instructions on the official React Native documentation to get the app running on either iOS or Android simulators.

## How It Works
### Game Flow:
- **Login:** Upon logging in, the user is verified, and their card collection is displayed.
- **Card Display:** On the home screen, users can see the cards they own, with non-owned cards displayed in greyscale.
- **Purchasing Cards:** Users can choose to buy a random card from a category, which costs one coin. The status of the card is updated once purchased.
- **Categories:** Users can use the scroll bar to jump to different categories of cards.
### In-Game Features:
- **Card Ownership:** Each card has an ownership status indicated by color (owned cards are in color, non-owned cards are greyscale).
- **Coins:** Users can purchase cards for one coin, with the number of coins visible at the top of the screen.
- **Categories:** Users can explore different categories of cards by scrolling through the bar on the home screen.

## Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Here's how you can contribute:

Fork the repository.
Create a new branch for your changes.
Commit your changes.
Push to your fork.
Submit a pull request.
We welcome bug fixes, new features, and improvements!

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Thanks to the open-source community for providing the libraries and frameworks used in this project.

## Contact
If you have any questions or feedback, feel free to reach out to me:

Email: zbz494@student.bham.ac.uk
GitHub: zoe-zentner
LinkedIn: zoe-zentner
