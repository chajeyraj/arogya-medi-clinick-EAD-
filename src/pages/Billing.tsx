import React, { useState } from 'react';
import { PlusIcon, MinusIcon, TrashIcon, PrinterIcon } from 'lucide-react';
import { medicines } from '../data/medicines';
import { useCurrency } from '../context/CurrencyContext';
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};
const Billing: React.FC = () => {
  const { format } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const addToCart = (medicine: any) => {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      // Update quantity if already in cart
      updateQuantity(medicine.id, existingItem.quantity + 1);
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: medicine.id,
        name: medicine.name,
        price: medicine.sellingPrice,
        quantity: 1,
        total: medicine.sellingPrice
      };
      setCart([...cart, newItem]);
    }
  };
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: newQuantity,
          total: item.price * newQuantity
        };
      }
      return item;
    }));
  };
  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    if (!customerName) {
      alert('Please enter customer name');
      return;
    }
    setShowPrintPreview(true);
  };
  const generateBillNumber = () => {
    return `B${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;
  };
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Search & List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="mb-4">
              <input type="text" placeholder="Search medicines..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedicines.map(medicine => <div key={medicine.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer" onClick={() => addToCart(medicine)}>
                  <h3 className="font-medium">{medicine.name}</h3>
                  <p className="text-sm text-gray-500">{medicine.category}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">{format(medicine.sellingPrice)}</span>
                    <span className="text-sm text-gray-500">
                      Stock: {medicine.stockQuantity}
                    </span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        {/* Cart & Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-lg font-bold mb-4">Cart</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Customer Name
              </label>
              <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter customer name" />
            </div>
            {cart.length === 0 ? <div className="text-center py-8 text-gray-500">
                Cart is empty
              </div> : <>
                <div className="max-h-80 overflow-y-auto mb-4">
                  {cart.map(item => <div key={item.id} className="flex justify-between items-center py-2 border-b">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          {format(item.price)} each
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 bg-gray-200 rounded">
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="mx-2 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 bg-gray-200 rounded">
                          <PlusIcon className="h-4 w-4" />
                        </button>
                        <button onClick={() => removeItem(item.id)} className="ml-2 p-1 text-red-500">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>)}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>{format(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{format(total)}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Payment Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="mr-2" />
                      Cash
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="mr-2" />
                      Card
                    </label>
                  </div>
                </div>
              </>}
            <button onClick={handleCheckout} disabled={cart.length === 0 || !customerName} className={`w-full py-2 rounded-lg flex items-center justify-center ${cart.length === 0 || !customerName ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-yellow-500 text-black hover:bg-yellow-600'}`}>
              <PrinterIcon className="h-5 w-5 mr-2" /> Generate Bill
            </button>
          </div>
        </div>
      </div>
      {/* Print Preview Modal */}
      {showPrintPreview && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">Arogya Pharmacy</h2>
              <p className="text-sm text-gray-500">123 Main Street, Colombo</p>
              <p className="text-sm text-gray-500">Tel: +94 11 234 5678</p>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-bold">Bill No:</span>
                <span>{generateBillNumber()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Customer:</span>
                <span>{customerName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Payment Method:</span>
                <span className="capitalize">{paymentMethod}</span>
              </div>
            </div>
            <table className="w-full mb-4">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Item</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => <tr key={item.id} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">
                      {format(item.price)}
                    </td>
                    <td className="text-right py-2">
                      {format(item.total)}
                    </td>
                  </tr>)}
              </tbody>
            </table>
            <div className="border-t pt-2 mb-6">
              <div className="flex justify-between mb-1">
                <span>Subtotal:</span>
                <span>{format(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Tax (10%):</span>
                <span>{format(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{format(total)}</span>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500 mb-6">
              <p>Thank you for shopping at Arogya Pharmacy!</p>
              <p>Get well soon!</p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setShowPrintPreview(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
                Close
              </button>
              <button onClick={() => {
            alert('Print functionality would be implemented here');
            setShowPrintPreview(false);
            setCart([]);
            setCustomerName('');
          }} className="px-4 py-2 bg-yellow-500 text-black rounded-lg flex items-center">
                <PrinterIcon className="h-5 w-5 mr-2" /> Print
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default Billing;