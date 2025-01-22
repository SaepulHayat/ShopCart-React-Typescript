// Response types
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

// Error types
export interface ApiError {
    message: string;
    status: number;
    errors?: any;
}

// Product types
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
}

//User types
export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    avatar: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role?: string;
}
// Cart types
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}