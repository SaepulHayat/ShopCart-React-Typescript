# ShopSmart - E-commerce React Application

# 🌐 My Project Website

Welcome to **My Awesome Project**!  
Visit the live website here: 👉 **[MyWebsite.com](https://saepulhayatshop.vercel.app/)**

---

## 🖼️ Website Preview

![Ido](<./public/readmeImage/dashboard.jpeg>)
> Replace this image with a screenshot of your website for a better visual impact.

## 🌟 Overview
ShopSmart adalah aplikasi e-commerce modern yang dibangun dengan React, TypeScript, dan Tailwind CSS. Aplikasi ini menyediakan pengalaman berbelanja yang mulus dengan fitur autentikasi, manajemen produk, keranjang belanja, dan checkout.

## 🚀 Tech Stack
- **Frontend Framework:** React + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Notifications:** React Toastify
- **Icons:** React Icons (Feather Icons)
- **API:** Platzi Fake Store API

## 🛠️ Installation & Setup

1. **Clone Repository**
```bash
git clone https://github.com/SaepulHayat/ShopCart-React-Typescript.git
cd shop-smart
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
Buat file `.env` di root directory:
```env
VITE_API_URL=https://api.escuelajs.co/api/v1
```

4. **Run Development Server**
```bash
npm run dev
```

## 📦 Project Structure
```
shop-smart/
├── src/
│   ├── components/         # Reusable components
│   ├── contexts/          # React Context providers
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
└── package.json         # Project dependencies
```

## 🎯 Features

### 1. Authentication
- **Login & Register**
```typescript
// src/contexts/AuthContexts.tsx
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Login implementation
    const login = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // ... other auth methods
};
```

### 2. Products Page
- Menampilkan produk dari API
- Fitur pencarian
- Filtering berdasarkan kategori
- Animasi dengan Framer Motion

```typescript
// src/pages/Products.tsx
const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchProducts();
    }, []);

    // ... product rendering logic
};
```

### 3. Shopping Cart
- Menambah/menghapus item
- Update quantity
- Perhitungan total otomatis

```typescript
// src/contexts/CartContexts.tsx
interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (newItem: CartItem) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === newItem.id);
            if (existingItem) {
                return currentItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, newItem];
        });
    };

    // ... other cart methods
};
```

### 4. Checkout Process
- Review order
- Shipping information
- Payment simulation

```typescript
// src/pages/Checkout.tsx
const Checkout: React.FC = () => {
    const { items, clearCart } = useCart();
    const navigate = useNavigate();

    const handlePayment = () => {
        toast.success('Payment successful!');
        clearCart();
        navigate('/products');
    };

    // ... checkout UI
};
```

## 🔒 Private Routes
```typescript
// src/components/PrivateRoute.tsx
const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
```

## 🎨 Styling
Menggunakan Tailwind CSS untuk styling yang konsisten dan responsif:

```typescript
// Contoh penggunaan Tailwind
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map(product => (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            // ... product card content
        </div>
    ))}
</div>
```

## 🌐 API Integration
Menggunakan Axios untuk komunikasi dengan backend:

```typescript
// src/services/products.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
```

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints untuk tablet dan desktop
- Flexible layouts dengan CSS Grid dan Flexbox

## 🚀 Deployment

1. **Build Project**
```bash
npm run build
```

2. **Deploy ke Vercel**
```bash
vercel login
vercel
```
## Or 

### 📌 Langkah-Langkah Deploy ke Vercel Menggunakan GitHub:

#### **1. Login ke Vercel**
- Masuk ke [Vercel](https://vercel.com/) menggunakan akun GitHub Anda.
- Pilih opsi **“Continue with GitHub”** untuk login.
- Berikan izin yang diperlukan jika diminta oleh Vercel untuk mengakses repository GitHub Anda.

---
![Ido](<./public/readmeImage/editImage.png>)

#### **2. Pilih Repository**
- Setelah login, buka halaman dashboard Vercel.
- Pilih **"Add New > Project"** untuk memulai proyek baru.
  
---

#### **3. Impor Repository GitHub**
- Klik pada tombol **"Import Git Repository"**.
- Cari repository yang ingin Anda deploy.
- Klik tombol **"Import"** di sebelah repository tersebut.

---

#### **4. Konfigurasi Pengaturan**
- Pada halaman konfigurasi:
  - **Build and Output Settings**: Pastikan framework Anda terdeteksi otomatis (seperti Next.js, React, dll.).
  - **Environment Variables**: Jika proyek Anda membutuhkan variabel environment, tambahkan di bagian ini.
  - Klik **Deploy** untuk melanjutkan.

---

#### **5. Deploy Berhasil**
- Setelah proses deploy selesai, Anda akan diarahkan ke halaman sukses dengan link **Production Deployment**.
- Klik link tersebut untuk melihat website Anda yang telah berhasil dideploy!

---

Dengan langkah-langkah sederhana ini, website Anda kini online dengan domain default dari Vercel, seperti `https://saepulhayatshop.vercel.app/`.

---

**Tips Tambahan**:
- Anda bisa mengkustomisasi domain melalui pengaturan domain Vercel.
- Periksa tab **Logs** di dashboard Vercel jika ada error selama deploy.

3. **Environment Variables di Vercel**
- Tambahkan environment variables yang diperlukan di dashboard Vercel

## 🔍 Testing
```bash
npm run test
```

## 📝 Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License
MIT License

## 👥 Authors
- Your Name - Initial work

## 🙏 Acknowledgments
- Platzi Fake Store API
- React community
- Tailwind CSS team

## 🔮 Future Improvements
1. Implementasi wishlist
2. Review dan rating system
3. Admin dashboard
4. Payment gateway integration
5. Order history
6. Real-time notifications

## 🤝 Support
Jika Anda memiliki pertanyaan atau menemukan issues, silakan buat issue baru di repository ini.

---

**Note:** Pastikan untuk mengganti placeholder seperti `yourusername` dan "Your Name" dengan informasi yang sesuai sebelum menggunakan README ini.
