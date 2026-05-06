import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

/* ── Animated skeleton while loading ── */
const SkeletonDetail = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-4 w-48 skeleton rounded mb-8" />
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">
                <div className="skeleton rounded-[2rem] aspect-square w-full" />
                <div className="mt-10 lg:mt-0 space-y-5">
                    <div className="h-4 w-32 skeleton rounded-full" />
                    <div className="h-9 w-3/4 skeleton rounded-xl" />
                    <div className="h-5 w-28 skeleton rounded" />
                    <div className="h-24 skeleton rounded-2xl" />
                    <div className="h-16 skeleton rounded-2xl" />
                    <div className="space-y-3">
                        <div className="h-4 skeleton rounded" />
                        <div className="h-4 skeleton rounded" />
                        <div className="h-4 w-2/3 skeleton rounded" />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <div className="flex-1 h-14 skeleton rounded-2xl" />
                        <div className="w-14 h-14 skeleton rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
            setSelectedImage(data.thumbnail);
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
                    <Link to="/" className="text-primary-600 hover:underline font-medium">Return to Home</Link>
                </div>
            </div>
        );
    }

    const discountAmount = (product.price * product.discountPercentage / 100).toFixed(2);
    const originalPrice = (product.price + parseFloat(discountAmount)).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-sm font-medium text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-3 h-3 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ml-1 md:ml-2 capitalize">{product.category}</span>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ml-1 md:ml-2 text-gray-900 dark:text-white truncate max-w-[150px] md:max-w-xs">{product.title}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 items-start">
                    {/* Image Gallery */}
                    <div className="flex flex-col gap-6">
                        <div className="relative group overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl">
                            <div className="aspect-square flex items-center justify-center p-6 sm:p-12">
                                <img
                                    src={selectedImage || product.thumbnail}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            {product.discountPercentage > 0 && (
                                <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1.5 rounded-2xl text-xs font-black shadow-lg uppercase tracking-wider">
                                    {product.discountPercentage}% OFF
                                </div>
                            )}
                        </div>
                        
                        <div className="flex gap-4 overflow-x-auto py-2 px-1 scroll-smooth no-scrollbar">
                            {[product.thumbnail, ...product.images].filter((img, idx, self) => self.indexOf(img) === idx).map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                                        selectedImage === img 
                                        ? 'border-primary-500 ring-4 ring-primary-500/10 scale-105 shadow-lg shadow-primary-500/10' 
                                        : 'border-white dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 shadow-sm'
                                    } bg-white dark:bg-gray-800`}
                                >
                                    <div className="w-full h-full p-2 flex items-center justify-center">
                                        <img src={img} alt={`${product.title} view ${index + 1}`} className="max-w-full max-h-full object-contain" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 lg:mt-0 space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                    {product.brand}
                                </span>
                                <span className="text-gray-400 dark:text-gray-500">•</span>
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{product.category}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                {product.title}
                            </h1>
                            <div className="mt-4 flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{product.rating}</span>
                                </div>
                                <span className="text-gray-300 dark:text-gray-700">|</span>
                                <a href="#reviews" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline">
                                    See all reviews
                                </a>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-gray-900 dark:text-white">
                                    ${product.price}
                                </span>
                                {product.discountPercentage > 0 && (
                                    <span className="text-xl text-gray-500 line-through">
                                        ${originalPrice}
                                    </span>
                                )}
                            </div>
                            <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd"/></svg>
                                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Product Description</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary-600/20 flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                                Add to Cart
                            </button>
                            <button className="flex items-center justify-center p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors transform hover:scale-[1.02] active:scale-95">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-8">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800/50">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Warranty</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">2 Years</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800/50">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 4v16"/></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Shipping</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Free Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;