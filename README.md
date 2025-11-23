#  FitsnFoods - Flavors & Fits

A beautiful web application that combines fashion inspiration and food exploration in one place. Share your style, discover delicious dishes, and have fun with interactive features!

## Features

###  Food Gallery
- Browse a curated collection of food photos (burgers, desserts, pasta, drinks, pizza, brunch)
- Pinterest-style masonry grid layout
- Filter by category and search functionality
- Upload and share your own food photos
- Lightbox view for detailed image viewing

###  Fashion Gallery
- Explore fashion inspiration for different occasions
- Categories: College wear, date night, party wear, traditional, casual, summer fits
- Beautiful responsive design with hover effects
- Upload your own fashion photos

### Upload & Share
- Upload multiple images at once (up to 5 files, 5MB each)
- Add titles, categories, and descriptions
- Images are stored and displayed in the respective galleries
- Support for all image formats

###  Cute Runner Game
- Fun interactive game to keep you entertained
- Play directly in the browser

###  Photobooth
- Interactive photobooth feature for creative photo editing

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS
- **File Upload**: Multer
- **Animations**: Animate.css

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishika2324/fitsnfoods.git
   cd fitsnfoods
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
fitsnfoods/
├── views/              # HTML pages
│   ├── index.html     # Home page
│   ├── food.html      # Food gallery
│   ├── fashion.html   # Fashion gallery
│   ├── upload.html    # Upload page
│   ├── game.html      # Game page
│   └── photobooth.html # Photobooth page
├── public/            # Static assets
│   ├── images/        # Image assets
│   ├── videos/        # Video assets
│   ├── uploads/       # User uploaded images
│   └── style.css      # Additional styles
├── data/              # Data storage
│   └── uploads.json   # Upload metadata
├── server.js          # Express server
└── package.json       # Dependencies
```

## 🎯 Usage

### Home Page
- Navigate to the home page to see all available sections
- Beautiful video background with glassmorphism buttons

### Food Gallery
- Click on "Explore Food" to browse food photos
- Use category filters (Burger, Dessert, Pasta, Drinks, Pizza, Brunch)
- Search for specific dishes
- Click "Share Your Dish" to upload your own food photos

### Fashion Gallery
- Click on "Explore Fashion" to see fashion inspiration
- Filter by occasion (College, Date Night, Party, Traditional, etc.)
- Upload your own fashion photos

### Upload Feature
- Go to "My Diary" or use the upload button in galleries
- Select up to 5 images
- Add title, category, and description
- Submit to share with the community

## Configuration

The server runs on port `5000` by default. You can change this in `server.js`:

```javascript
const PORT = 5000;
```

## API Endpoints

- `GET /` - Home page
- `GET /food` - Food gallery page
- `GET /fashion` - Fashion gallery page
- `GET /upload` - Upload page
- `GET /game` - Game page
- `GET /photobooth` - Photobooth page
- `POST /upload` - Upload images
- `GET /api/uploads?page=<page>` - Get uploaded images for a specific page

## Features in Detail

### Responsive Design
- Mobile-first approach
- Works seamlessly on all devices
- Masonry grid layout adapts to screen size

### Image Management
- Automatic file naming with timestamps
- Metadata storage (title, category, description)
- Persistent storage in JSON format
- Image preview before upload

### User Experience
- Smooth animations and transitions
- Lightbox for full-size image viewing
- Search and filter functionality
- Back to top button
- Loading states and error handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Author

**Rishika2324**

- GitHub: [@Rishika2324](https://github.com/Rishika2324)

## Acknowledgments

- Tailwind CSS for beautiful styling
- Animate.css for smooth animations
- Express.js community for excellent documentation

## Support

If you have any questions or issues, please open an issue on the [GitHub repository](https://github.com/Rishika2324/fitsnfoods/issues).

---

Made with ❤️ for fashion and food lovers!

