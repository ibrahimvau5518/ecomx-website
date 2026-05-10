import { useState, useEffect } from 'react';
import { User, Settings, Package, ShoppingBag, LogOut, CheckCircle, BarChart3, Edit, TrendingUp, Users, DollarSign, Trash2, Shield, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface DashboardStats {
  totalUsers: number;
  totalItems: number;
  totalOrders: number;
  totalRevenue: number;
}

const mockChartData = [
  { name: 'Jan', sales: 4000, users: 2400 },
  { name: 'Feb', sales: 3000, users: 1398 },
  { name: 'Mar', sales: 2000, users: 9800 },
  { name: 'Apr', sales: 2780, users: 3908 },
  { name: 'May', sales: 1890, users: 4800 },
  { name: 'Jun', sales: 2390, users: 3800 },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    location: 'Dhaka, Bangladesh',
    category: 'Electronics'
  });

  const role = user?.role === 'admin' ? 'Admin' : 'User';

  const fetchData = async () => {
    try {
      if (user?.role === 'admin') {
        const [statsRes, itemsRes, usersRes] = await Promise.all([
          api.get('/api/dashboard/stats'),
          api.get('/api/items'),
          api.get('/api/users')
        ]);
        setStats(statsRes.data.data || statsRes.data);
        setItems(itemsRes.data.items || itemsRes.data.data || []);
        
        // Ensure we are pulling the correct user list from the backend response
        const usersList = usersRes.data.data || usersRes.data.users || usersRes.data || [];
        setUsers(Array.isArray(usersList) ? usersList : []);
      } else {
        const itemsRes = await api.get('/api/items');
        setItems(itemsRes.data.items || itemsRes.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/items', {
        ...newProduct,
        price: Number(newProduct.price)
      });
      setIsAddingProduct(false);
      setNewProduct({
        title: '',
        description: '',
        image: '',
        price: '',
        location: 'Dhaka, Bangladesh',
        category: 'Electronics'
      });
      fetchData();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to add product.');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/api/items/${productId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await api.patch(`/api/users/${userId}`, { role: newRole });
      fetchData();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/api/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getSidebarNav = () => {
    if (role === 'Admin') {
      return [
        { name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
        { name: 'Manage Users', icon: <User className="w-5 h-5" /> },
        { name: 'Manage Products', icon: <Package className="w-5 h-5" /> },
        { name: 'Manage Orders', icon: <ShoppingBag className="w-5 h-5" /> },
        { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
      ];
    }
    return [
      { name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
      { name: 'My Profile', icon: <User className="w-5 h-5" /> },
      { name: 'My Orders', icon: <ShoppingBag className="w-5 h-5" /> },
      { name: 'My Reviews', icon: <CheckCircle className="w-5 h-5" /> },
    ];
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col lg:flex-row">
      {/* Sidebar Sidebar Navigation */}
      <aside className="bg-card w-full lg:w-64 border-r border-border shrink-0 flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">Dashboard</h2>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">{role} Panel</span>
        </div>
        {/* Navigation Mapping */}
        <nav className="flex-1 p-4 space-y-2">
          {getSidebarNav().map((item) => (
             <button
               key={item.name}
               onClick={() => setActiveTab(item.name)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                 activeTab === item.name 
                   ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                   : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
               }`}
             >
               {item.icon}
               {item.name}
             </button>
          ))}
        </nav>
        
        {/* Sign Out Action */}
        <div className="p-4 border-t border-border mt-auto">
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
           >
             <LogOut className="w-5 h-5" />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Dashboard Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
           <h1 className="text-xl font-semibold">{activeTab}</h1>
           <div className="relative">
             <button 
               onClick={() => setDropdownOpen(!dropdownOpen)}
               className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors overflow-hidden focus:outline-none"
               aria-label="Profile menu"
             >
               {user?.image ? (
                 <img 
                   src={user.image} 
                   alt="Profile" 
                   className="w-full h-full object-cover" 
                   onError={(e) => {
                     e.currentTarget.onerror = null;
                     e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0B0F1A&color=fff&bold=true`;
                   }}
                 />
               ) : (
                 <span className="text-sm font-bold">{user?.name?.[0] || (role === 'Admin' ? 'A' : 'U')}</span>
               )}
             </button>

             {dropdownOpen && (
               <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border py-1 z-50">
                 <div className="px-4 py-2 text-sm text-foreground font-medium border-b border-border pb-3 mb-1 truncate">
                   {user?.email}
                 </div>
                 <button onClick={() => { setActiveTab(role === 'Admin' ? 'Settings' : 'My Profile'); setDropdownOpen(false); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                   <User className="w-4 h-4 mr-2" /> Profile
                 </button>
                 <button onClick={() => { setActiveTab('Settings'); setDropdownOpen(false); }} className="flex items-center w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                   <Settings className="w-4 h-4 mr-2" /> Settings
                 </button>
                 <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors transform active:scale-95">
                   <LogOut className="w-4 h-4 mr-2" /> Logout
                 </button>
               </div>
             )}
           </div>
        </header>

        {/* Dynamic Content Array */}
        <div className="p-6 flex-1 max-w-full overflow-hidden">
          
          {(activeTab === 'Overview' || activeTab === 'My Profile') && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <div className="card-container p-6 shadow-sm border-l-4 border-l-primary flex items-center justify-between">
                 <div>
                   <h3 className="text-sm font-medium text-muted-foreground mb-1">{role === 'Admin' ? 'Total Users' : 'Active Orders'}</h3>
                   <p className="text-2xl font-bold">{stats?.totalUsers || (role === 'Admin' ? '1,245' : '12')}</p>
                 </div>
                 <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Users className="w-6 h-6" />
                 </div>
               </div>
               <div className="card-container p-6 shadow-sm border-l-4 border-l-cyan-500 flex items-center justify-between">
                 <div>
                   <h3 className="text-sm font-medium text-muted-foreground mb-1">{role === 'Admin' ? 'Total Products' : 'My Reviews'}</h3>
                   <p className="text-2xl font-bold">{stats?.totalItems || (role === 'Admin' ? '842' : '4')}</p>
                 </div>
                 <div className="p-3 bg-cyan-500/10 rounded-full text-cyan-500">
                    <Package className="w-6 h-6" />
                 </div>
               </div>
               <div className="card-container p-6 shadow-sm border-l-4 border-l-amber-500 flex items-center justify-between">
                 <div>
                   <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Orders</h3>
                   <p className="text-2xl font-bold">{stats?.totalOrders || '156'}</p>
                 </div>
                 <div className="p-3 bg-amber-500/10 rounded-full text-amber-500">
                    <ShoppingBag className="w-6 h-6" />
                 </div>
               </div>
               <div className="card-container p-6 shadow-sm border-l-4 border-l-green-500 flex items-center justify-between">
                 <div>
                   <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</h3>
                   <p className="text-2xl font-bold">${stats?.totalRevenue?.toLocaleString() || '45,231'}</p>
                 </div>
                 <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                    <DollarSign className="w-6 h-6" />
                 </div>
               </div>
             </div>
          )}

          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sales Chart */}
              <div className="card-container p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Sales Statistics</h3>
                  <div className="p-2 bg-muted rounded-md">
                     <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                        itemStyle={{ color: '#22d3ee' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* User Growth Chart */}
              <div className="card-container p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">User Activity</h3>
                    <div className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full font-medium">+12% vs last month</div>
                 </div>
                 <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                        cursor={{ fill: '#374151', opacity: 0.4 }}
                      />
                      <Bar dataKey="users" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={35} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'My Profile' && (
            <div className="card-container p-8 max-w-2xl shadow-sm">
               <div className="flex items-center gap-6 mb-8">
                 <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-md overflow-hidden">
                   {user?.image ? (
                     <img 
                       src={user.image} 
                       alt="Profile" 
                       className="w-full h-full object-cover" 
                       onError={(e) => {
                         e.currentTarget.onerror = null;
                         e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0B0F1A&color=fff&bold=true`;
                       }}
                     />
                   ) : (
                     user?.name?.[0] || (role === 'Admin' ? 'A' : 'U')
                   )}
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold">{user?.name || (role === 'Admin' ? 'Admin User' : 'Standard User')}</h2>
                   <p className="text-muted-foreground">{user?.email}</p>
                   <button className="text-primary text-sm font-medium hover:underline mt-2 flex items-center gap-1">
                     <Edit className="w-4 h-4" /> Update Avatar
                   </button>
                 </div>
               </div>

               <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium mb-1">Full Name</label>
                     <input type="text" className="input-field" defaultValue={user?.name} />
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-1">User ID</label>
                     <input type="text" className="input-field bg-muted/50 cursor-not-allowed" value={user?._id} disabled />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-1">Email Address</label>
                   <input type="email" className="input-field bg-muted/50 cursor-not-allowed" value={user?.email} disabled />
                 </div>
                 <button className="btn-primary mt-4">Save Changes</button>
               </form>
            </div>
          )}

          {(activeTab === 'Manage Users' || activeTab === 'Manage Products' || activeTab === 'Manage Orders' || activeTab === 'My Orders') && (
            <div className="card-container shadow-sm overflow-hidden">
               <div className="p-6 border-b border-border flex justify-between items-center bg-muted/5">
                  <h3 className="text-lg font-semibold">{activeTab}</h3>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Filter..." className="input-field py-1 px-3 text-sm max-w-[150px]" />
                    {activeTab === 'Manage Products' && (
                      <button 
                        onClick={() => setIsAddingProduct(true)}
                        className="btn-primary py-1 px-3 text-sm"
                      >
                        Add New
                      </button>
                    )}
                  </div>
               </div>

               {isAddingProduct && activeTab === 'Manage Products' && (
                 <div className="p-6 border-b border-border bg-primary/5">
                   <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     <input 
                       type="text" placeholder="Product Title" required className="input-field py-1"
                       value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                     />
                     <input 
                       type="number" placeholder="Price" required className="input-field py-1"
                       value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                     />
                     <select 
                       className="input-field py-1"
                       value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                     >
                       <option value="Electronics">Electronics</option>
                       <option value="Fashion">Fashion</option>
                       <option value="Home">Home</option>
                       <option value="Other">Other</option>
                     </select>
                     <input 
                       type="text" placeholder="Image URL" required className="input-field py-1 md:col-span-2 lg:col-span-2"
                       value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                     />
                     <textarea 
                       placeholder="Description" className="input-field py-1 md:col-span-2 lg:col-span-3"
                       value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                     />
                     <div className="flex gap-2 lg:col-span-3">
                        <button type="submit" className="btn-primary py-1 text-sm px-6">Save Product</button>
                        <button type="button" onClick={() => setIsAddingProduct(false)} className="bg-muted text-foreground py-1 px-6 rounded-lg text-sm border border-border">Cancel</button>
                     </div>
                   </form>
                 </div>
               )}

               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
                        <th className="px-6 py-4">Record</th>
                        <th className="px-6 py-4">Category / Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {activeTab === 'Manage Products' ? (
                        items.length > 0 ? (
                          items.map((item) => (
                            <tr key={item._id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img src={item.image} alt={item.title || item.name} className="w-8 h-8 rounded object-cover" />
                                  <div>
                                    <p className="font-medium text-sm">{item.title || item.name}</p>
                                    <p className="text-[10px] text-muted-foreground italic">ID: {item._id.slice(-8)}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-0.5 bg-muted rounded border border-border">{item.category}</span></td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${(!item.stock || item.stock > 0) ? 'bg-green-500' : 'bg-red-500'}`} />
                                  <span className="text-xs">{(!item.stock || item.stock > 0) ? `Available` : 'Out of Stock'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-xs text-muted-foreground text-nowrap">${item.price}</td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="text-primary hover:text-white transition-colors p-1.5 bg-primary/5 rounded border border-primary/10"><Edit className="w-3.5 h-3.5" /></button>
                                  <button 
                                    onClick={() => handleDeleteProduct(item._id)}
                                    className="text-red-500 hover:text-white hover:bg-red-500 transition-colors p-1.5 bg-red-500/5 rounded border border-red-500/10"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">No products found.</td>
                          </tr>
                        )
                      ) : activeTab === 'Manage Users' ? (
                        users.length > 0 ? (
                          users.map((u) => (
                            <tr key={u._id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center font-bold text-[10px]">
                                    {u.name?.[0]}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{u.name}</p>
                                    <p className="text-[10px] text-muted-foreground italic truncate max-w-[120px]">{u.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                  u.role === 'admin' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted border-border'
                                }`}>
                                  {u.role?.toUpperCase()}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                  <span className="text-xs">Active</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-xs text-muted-foreground">
                                {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {u.role === 'admin' ? (
                                    <button 
                                      onClick={() => handleUpdateRole(u._id, 'user')}
                                      title="Demote to User"
                                      className="text-amber-500 hover:text-amber-400 transition-colors p-1.5 bg-amber-500/5 rounded border border-amber-500/10"
                                    >
                                      <UserCircle className="w-3.5 h-3.5" />
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => handleUpdateRole(u._id, 'admin')}
                                      title="Promote to Admin"
                                      className="text-primary hover:text-white transition-colors p-1.5 bg-primary/5 rounded border border-primary/10"
                                    >
                                      <Shield className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => handleDeleteUser(u._id)}
                                    title="Delete User"
                                    className="text-red-500 hover:text-white hover:bg-red-500 transition-colors p-1.5 bg-red-500/5 rounded border border-red-500/10"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">No users found.</td>
                          </tr>
                        )
                      ) : (
                        [1, 2, 3].map((item) => (
                          <tr key={item} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center font-bold text-xs">#{item}</div>
                                 <div>
                                    <p className="font-medium text-sm">{activeTab.includes('User') ? `User Account ${item}` : `Platform Item ${item}`}</p>
                                    <p className="text-[10px] text-muted-foreground italic">ID: 64b8e...{item}</p>
                                 </div>
                              </div>
                            </td>
                            <td className="px-6 py-4"><span className="text-[10px] font-bold px-2 py-0.5 bg-muted rounded border border-border">{activeTab.includes('User') ? 'STAFF' : 'INVENTORY'}</span></td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                 <span className="text-xs">Active</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-muted-foreground text-nowrap">May 07, 2026</td>
                            <td className="px-6 py-4 text-right">
                               <button className="text-primary hover:text-white transition-colors p-1.5 bg-primary/5 rounded border border-primary/10"><Edit className="w-3.5 h-3.5" /></button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}