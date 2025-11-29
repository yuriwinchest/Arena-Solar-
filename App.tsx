import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Wallet, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Volleyball, 
  Trophy, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Filter,
  Download,
  MoreVertical,
  CreditCard,
  Award,
  ChevronDown,
  ChevronUp,
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  User,
  Lock,
  Camera,
  Trash2,
  Clock,
  ArrowRight,
  Send,
  ChevronLeft,
  ChevronRight,
  List,
  Grid3X3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { ViewState, Reservation } from './types';

// --- Mock Data ---
const MOCK_RESERVATIONS: Reservation[] = [
  { id: '#86753', clientName: 'Ana Clara', court: 'Quadra 1', date: '2024-10-25', startTime: '18:00', endTime: '19:00', status: 'confirmed', amount: 90 },
  { id: '#86752', clientName: 'Bruno Silva', court: 'Quadra 2', date: '2024-10-25', startTime: '17:00', endTime: '18:00', status: 'pending', amount: 90 },
  { id: '#86751', clientName: 'Carlos Lima', court: 'Quadra 1', date: '2024-10-24', startTime: '20:00', endTime: '21:00', status: 'completed', amount: 90 },
  { id: '#86750', clientName: 'Daniela Costa', court: 'Quadra 3', date: '2024-10-24', startTime: '19:00', endTime: '20:00', status: 'cancelled', amount: 90 },
  { id: '#86749', clientName: 'Eduardo Matos', court: 'Quadra 2', date: '2024-10-23', startTime: '16:00', endTime: '17:00', status: 'confirmed', amount: 80 },
];

const FINANCIAL_DATA = [
  { name: 'Seg', revenue: 400 },
  { name: 'Ter', revenue: 300 },
  { name: 'Qua', revenue: 550 },
  { name: 'Qui', revenue: 450 },
  { name: 'Sex', revenue: 850 },
  { name: 'Sab', revenue: 1200 },
  { name: 'Dom', revenue: 950 },
];

// --- Shared UI Components ---

const Button = ({ children, variant = 'primary', className = '', onClick, icon: Icon, disabled = false }: any) => {
  const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-yellow-400 hover:bg-yellow-500 text-neutral-900 border border-transparent",
    secondary: "bg-neutral-700 hover:bg-neutral-600 text-white",
    outline: "border border-neutral-600 text-neutral-300 hover:border-yellow-400 hover:text-yellow-400 bg-transparent",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    ghost: "text-neutral-400 hover:text-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} onClick={onClick} disabled={disabled}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-neutral-800 border border-neutral-700 rounded-xl p-5 ${className}`}>
    {children}
  </div>
);

const Badge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
    completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    atrasado: 'bg-red-500/20 text-red-400 border-red-500/30',
    pago: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const label: Record<string, string> = {
    confirmed: 'Confirmada',
    completed: 'Finalizada',
    pending: 'Pendente',
    cancelled: 'Cancelada',
    atrasado: 'Atrasado',
    pago: 'Pago'
  };

  const key = status.toLowerCase();
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[key] || styles.pending}`}>
      {label[key] || status}
    </span>
  );
};

// --- Admin Components ---

const AdminSidebar = ({ currentView, setView }: { currentView: ViewState, setView: (v: ViewState) => void }) => {
  const menuItems = [
    { id: 'admin-dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'admin-reservations', label: 'Reservas', icon: CalendarDays },
    { id: 'admin-clients', label: 'Clientes', icon: Users },
    { id: 'admin-financial', label: 'Financeiro', icon: Wallet },
    { id: 'admin-settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col h-screen fixed left-0 top-0 z-20 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-neutral-900">
          <Volleyball size={24} />
        </div>
        <h1 className="text-xl font-bold text-white">Arena Solar</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewState)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id 
                ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' 
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-neutral-500 truncate">Master</p>
          </div>
        </div>
        <button 
            onClick={() => setView('login')}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const AdminHeader = ({ title }: { title: string }) => (
  <header className="h-20 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-8 sticky top-0 z-10">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    <div className="flex items-center gap-4">
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
        <input 
          type="text" 
          placeholder="Buscar por clientes, reservas..." 
          className="bg-neutral-800 border border-neutral-700 text-neutral-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-yellow-400 w-80"
        />
      </div>
      <button className="relative p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center md:hidden">
        <span className="font-bold text-neutral-900">A</span>
      </div>
    </div>
  </header>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-neutral-400 text-sm">Reservas para Hoje</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">12</span>
            <span className="text-xs text-green-400 font-medium">+5% vs ontem</span>
          </div>
        </Card>
        <Card>
          <p className="text-neutral-400 text-sm">Receita Prevista</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">R$ 850,00</span>
            <span className="text-xs text-green-400 font-medium">+12% vs ontem</span>
          </div>
        </Card>
        <Card>
          <p className="text-neutral-400 text-sm">Check-ins Realizados</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">8</span>
            <span className="text-xs text-green-400 font-medium">+10% vs ontem</span>
          </div>
        </Card>
        <Card>
          <p className="text-neutral-400 text-sm">Pagamentos Pendentes</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">3</span>
            <span className="text-xs text-red-400 font-medium">-2% vs ontem</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card className="h-80">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-white">Receita da Semana</h3>
                    <select className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm rounded-lg px-2 py-1 outline-none">
                        <option>Esta Semana</option>
                        <option>Mês Passado</option>
                    </select>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart data={FINANCIAL_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" vertical={false} />
                    <XAxis dataKey="name" stroke="#737373" />
                    <YAxis stroke="#737373" tickFormatter={(val) => `R$${val}`} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#262626', borderColor: '#404040', color: '#fff' }}
                        itemStyle={{ color: '#FACC15' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#FACC15" strokeWidth={3} dot={{ fill: '#FACC15', strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-neutral-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white">Próximas Reservas</h3>
                    <button className="text-sm text-yellow-400 hover:text-yellow-300">Ver todas</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-900/50 text-neutral-400 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">Cliente</th>
                                <th className="px-6 py-4 font-medium">Horário</th>
                                <th className="px-6 py-4 font-medium">Quadra</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-700">
                            {MOCK_RESERVATIONS.slice(0,4).map((res) => (
                                <tr key={res.id} className="text-neutral-200 hover:bg-neutral-700/30 transition-colors">
                                    <td className="px-6 py-4">{res.clientName}</td>
                                    <td className="px-6 py-4">{res.startTime} - {res.endTime}</td>
                                    <td className="px-6 py-4">{res.court}</td>
                                    <td className="px-6 py-4">
                                        <Badge status={res.status === 'confirmed' ? 'Pago' : res.status === 'pending' ? 'Pendente' : res.status === 'cancelled' ? 'Atrasado' : 'Pago'} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Notificações</h3>
            
            <div className="bg-neutral-800/50 border border-l-4 border-l-yellow-400 border-neutral-700 p-4 rounded-r-lg flex gap-4">
                <div className="text-yellow-400 mt-1">
                    <AlertCircle size={24} />
                </div>
                <div>
                    <h4 className="font-semibold text-white">Reembolso Solicitado</h4>
                    <p className="text-sm text-neutral-400 mt-1">Cliente Ana Souza cancelou e solicitou reembolso de R$ 70,00.</p>
                </div>
            </div>

             <div className="bg-neutral-800/50 border border-neutral-700 p-4 rounded-lg flex gap-4">
                <div className="text-neutral-400 mt-1">
                    <Users size={24} />
                </div>
                <div>
                    <h4 className="font-semibold text-white">Novo Funcionário</h4>
                    <p className="text-sm text-neutral-400 mt-1">Revisar o cadastro do novo funcionário "Pedro Costa".</p>
                </div>
            </div>

            <div className="bg-neutral-800/50 border border-l-4 border-l-yellow-400 border-neutral-700 p-4 rounded-r-lg flex gap-4">
                <div className="text-yellow-400 mt-1">
                    <AlertCircle size={24} />
                </div>
                <div>
                    <h4 className="font-semibold text-white">Falha no Pagamento</h4>
                    <p className="text-sm text-neutral-400 mt-1">Pagamento recorrente do plano de João Silva falhou.</p>
                </div>
            </div>

             <div className="bg-neutral-800/50 border border-neutral-700 p-4 rounded-lg flex gap-4">
                <div className="text-neutral-400 mt-1">
                    <X size={24} />
                </div>
                <div>
                    <h4 className="font-semibold text-white">Cancelamento</h4>
                    <p className="text-sm text-neutral-400 mt-1">Reserva de Marcos Andrade para 21h foi cancelada.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Reservations = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    const courts = ['Quadra 1', 'Quadra 2', 'Quadra 3'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex gap-2">
                    <div className="bg-neutral-800 p-1 rounded-lg flex border border-neutral-700">
                        <button 
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-yellow-400 text-neutral-900' : 'text-neutral-400 hover:text-white'}`}
                            onClick={() => setViewMode('grid')}
                            title="Grade"
                        >
                            <Grid3X3 size={20} />
                        </button>
                        <button 
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-yellow-400 text-neutral-900' : 'text-neutral-400 hover:text-white'}`}
                            onClick={() => setViewMode('list')}
                            title="Lista"
                        >
                            <List size={20} />
                        </button>
                    </div>
                    {viewMode === 'list' && (
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                            <input 
                                type="text" 
                                placeholder="Buscar..." 
                                className="bg-neutral-800 border border-neutral-700 text-neutral-200 pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-yellow-400 w-64"
                            />
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                     {viewMode === 'list' && <Button variant="outline" icon={Download}>Exportar</Button>}
                    <Button icon={Plus}>Criar Reserva</Button>
                    <Button variant="primary" className="bg-yellow-300">Operação Balcão</Button>
                </div>
            </div>

            {viewMode === 'list' ? (
                // --- LIST VIEW ---
                <>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <button className="px-4 py-1.5 rounded-full bg-yellow-400/10 text-yellow-400 text-sm font-medium border border-yellow-400/20">Todos</button>
                        <button className="px-4 py-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white text-sm font-medium border border-neutral-700">Confirmada</button>
                        <button className="px-4 py-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white text-sm font-medium border border-neutral-700">Pendente</button>
                        <button className="px-4 py-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white text-sm font-medium border border-neutral-700">Cancelada</button>
                        <button className="px-4 py-1.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white text-sm font-medium border border-neutral-700">Finalizada</button>
                    </div>

                    <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-900/40 text-neutral-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">ID Reserva</th>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Data/Hora</th>
                                    <th className="px-6 py-4">Quadra</th>
                                    <th className="px-6 py-4">Pagamento</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-700">
                                {MOCK_RESERVATIONS.map((res) => (
                                    <tr key={res.id} className="text-sm text-neutral-300 hover:bg-neutral-700/20 transition-colors">
                                        <td className="px-6 py-4 font-mono text-neutral-400">{res.id}</td>
                                        <td className="px-6 py-4 font-medium text-white">{res.clientName}</td>
                                        <td className="px-6 py-4">{res.date} {res.startTime}</td>
                                        <td className="px-6 py-4">{res.court}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${res.status === 'confirmed' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-yellow-900/50 text-yellow-500 border border-yellow-800'}`}>
                                                {res.status === 'confirmed' ? 'Pago' : res.status === 'pending' ? 'Pendente' : 'Atrasado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded text-xs border border-neutral-600 bg-neutral-700 text-neutral-300">
                                                Confirmada
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-neutral-400 hover:text-white">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                // --- GRID VIEW ---
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Calendar Sidebar */}
                    <div className="w-full lg:w-80 space-y-6">
                        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-4 text-white">
                                <button className="p-1 hover:bg-neutral-700 rounded"><ChevronLeft size={20}/></button>
                                <span className="font-bold">Julho 2024</span>
                                <button className="p-1 hover:bg-neutral-700 rounded"><ChevronRight size={20}/></button>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                {['D','S','T','Q','Q','S','S'].map((d, i) => (
                                    <span key={i} className="text-neutral-500 font-medium py-2">{d}</span>
                                ))}
                                {Array.from({length: 31}, (_, i) => i + 1).map((d) => (
                                    <button 
                                        key={d} 
                                        className={`py-2 rounded-lg hover:bg-neutral-700 text-neutral-300 ${d === 24 ? 'bg-yellow-400 text-neutral-900 font-bold hover:bg-yellow-500' : ''}`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-5">
                            <h3 className="text-white font-bold mb-4">Legenda</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded border border-yellow-400"></div>
                                    <span className="text-neutral-400">Disponível</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded bg-yellow-400"></div>
                                    <span className="text-neutral-400">Selecionado</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded bg-neutral-600"></div>
                                    <span className="text-neutral-400">Ocupado</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-neutral-700 flex justify-between items-center bg-neutral-900/30">
                            <h3 className="text-lg font-bold text-white">Horários para 24 de Julho</h3>
                            <div className="flex items-center gap-2 text-sm text-neutral-400 bg-neutral-900 border border-neutral-700 px-3 py-1.5 rounded-lg">
                                <Filter size={14} />
                                <span>Todas as quadras</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>
                        <div className="flex-1 overflow-x-auto">
                            <div className="min-w-[800px]">
                                <div className="grid grid-cols-10 border-b border-neutral-700 bg-neutral-900/50">
                                    <div className="col-span-1 p-4 text-neutral-500 text-xs font-bold uppercase border-r border-neutral-700"></div>
                                    {hours.map(h => (
                                        <div key={h} className="col-span-1 p-4 text-center text-neutral-500 text-xs font-bold border-r border-neutral-700 last:border-r-0">{h}</div>
                                    ))}
                                </div>
                                {courts.map((court, index) => (
                                    <div key={court} className={`grid grid-cols-10 h-24 ${index !== courts.length - 1 ? 'border-b border-neutral-700' : ''}`}>
                                        <div className="col-span-1 px-4 flex items-center justify-center text-white text-sm font-semibold border-r border-neutral-700 bg-neutral-800/30">
                                            {court}
                                        </div>
                                        {hours.map(h => {
                                            // Mock logic for admin view
                                            const isBooked = (court === 'Quadra 1' && h === '13:00') || (court === 'Quadra 2' && h === '16:00');
                                            const isSelected = (court === 'Quadra 1' && h === '14:00');
                                            
                                            return (
                                                <div 
                                                    key={`${court}-${h}`} 
                                                    className={`col-span-1 border-r border-neutral-700 last:border-r-0 relative p-1`}
                                                >
                                                    {isBooked ? (
                                                        <div className="w-full h-full bg-neutral-700/50 rounded flex items-center justify-center border border-neutral-600">
                                                            <div className="text-center">
                                                                <span className="block text-xs font-bold text-white">Ana C.</span>
                                                                <span className="block text-[10px] text-neutral-400">Pago</span>
                                                            </div>
                                                        </div>
                                                    ) : isSelected ? (
                                                        <div className="w-full h-full bg-yellow-400 rounded flex items-center justify-center shadow-lg">
                                                            <span className="text-neutral-900 font-bold text-xs">Reservando</span>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-full border border-dashed border-neutral-700/50 rounded hover:bg-neutral-700/30 transition-colors cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100">
                                                            <Plus size={16} className="text-neutral-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const Financial = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between">
             <div className="flex justify-between items-start">
                 <div>
                     <p className="text-neutral-400 text-sm">Faturamento Total</p>
                     <h3 className="text-2xl font-bold text-white mt-1">R$ 12.450,75</h3>
                 </div>
                 <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                     <Trophy size={20} />
                 </div>
             </div>
             <p className="text-green-500 text-xs mt-4 flex items-center gap-1">↑ 15.2% vs. período anterior</p>
        </Card>
        <Card className="flex flex-col justify-between">
             <div className="flex justify-between items-start">
                 <div>
                     <p className="text-neutral-400 text-sm">Reembolsos Processados</p>
                     <h3 className="text-2xl font-bold text-white mt-1">R$ 420,00</h3>
                 </div>
                 <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                     <AlertCircle size={20} />
                 </div>
             </div>
             <p className="text-red-500 text-xs mt-4 flex items-center gap-1">↓ 5 reembolsos no período</p>
        </Card>
         <Card className="flex flex-col justify-between">
             <div className="flex justify-between items-start">
                 <div>
                     <p className="text-neutral-400 text-sm">Reservas Pagas</p>
                     <h3 className="text-2xl font-bold text-white mt-1">289</h3>
                 </div>
                 <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                     <CheckCircle2 size={20} />
                 </div>
             </div>
             <p className="text-green-500 text-xs mt-4 flex items-center gap-1">↑ 32 novas reservas</p>
        </Card>
    </div>
  </div>
);


// --- Public Facing Components ---

const PublicNavbar = ({ setView, currentView }: { setView: (v: ViewState) => void, currentView: ViewState }) => {
  const isClientView = currentView.startsWith('client-');
  
  return (
    <nav className="h-20 bg-neutral-900/90 backdrop-blur fixed w-full top-0 z-50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('public-home')}>
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-neutral-900">
              <Volleyball size={20} />
          </div>
          <span className="text-xl font-bold text-white">Arena Solar Beach Bar</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <button className={`hover:text-yellow-400 transition-colors ${currentView === 'public-home' ? 'text-yellow-400' : ''}`} onClick={() => setView('public-home')}>Início</button>
          <button className={`hover:text-yellow-400 transition-colors ${currentView === 'public-booking' ? 'text-yellow-400' : ''}`} onClick={() => setView('public-booking')}>Reservas</button>
          <button className={`hover:text-yellow-400 transition-colors ${currentView === 'public-promotions' ? 'text-yellow-400' : ''}`} onClick={() => setView('public-promotions')}>Promoções e Eventos</button>
          <button className={`hover:text-yellow-400 transition-colors ${currentView === 'public-contact' ? 'text-yellow-400' : ''}`} onClick={() => setView('public-contact')}>Contato</button>
        </div>

        <div className="flex items-center gap-4">
          {!isClientView ? (
             <>
                <Button 
                    variant="primary" 
                    onClick={() => setView('login')} 
                    className="hidden md:flex text-sm py-2 px-6"
                >
                    Login
                </Button>
                <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white cursor-pointer" onClick={() => setView('login')}>
                     <User size={20} />
                </div>
             </>
          ) : (
            <>
               <button className="hidden md:block text-sm font-medium text-white hover:text-yellow-400 transition-colors" onClick={() => setView('client-bookings')}>Meus Agendamentos</button>
               <div className="w-10 h-10 rounded-full bg-neutral-700 border border-yellow-400 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => setView('client-profile')}>
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
               </div>
            </>
          )}
          <div className="md:hidden w-10 h-10 flex items-center justify-center text-white">
               <Menu size={24} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center text-neutral-900">
                             <Volleyball size={20} />
                        </div>
                        <span className="text-xl font-bold text-white">Arena Solar Beach Bar</span>
                    </div>
                    <p className="text-neutral-400 max-w-sm mb-6">Sua melhor opção para esportes de areia e lazer. Venha viver essa experiência conosco.</p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6">Navegação</h4>
                    <ul className="space-y-4 text-neutral-400 text-sm">
                        <li><a href="#" className="hover:text-yellow-400">Início</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Reservar Quadra</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Sobre Nós</a></li>
                        <li><a href="#" className="hover:text-yellow-400">Contato</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6">Contato</h4>
                    <ul className="space-y-4 text-neutral-400 text-sm">
                         <li className="flex items-start gap-3">
                             <MapPin size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                             <span>Av. Beira Mar, 123 - Praia do Sol<br/>São Paulo, SP</span>
                         </li>
                         <li className="flex items-center gap-3">
                             <Phone size={18} className="text-yellow-400 shrink-0" />
                             <span>(11) 98765-4321</span>
                         </li>
                         <li className="flex items-center gap-3">
                             <Mail size={18} className="text-yellow-400 shrink-0" />
                             <span>contato@arenasolar.com</span>
                         </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
                <p>&copy; 2024 Arena Solar Beach Bar. Todos os direitos reservados.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white">Termos de Uso</a>
                    <a href="#" className="hover:text-white">Política de Privacidade</a>
                </div>
            </div>
        </div>
    </footer>
);

const PublicHome = ({ setView }: { setView: (v: ViewState) => void }) => {
  return (
    <div className="bg-neutral-900 min-h-screen font-sans text-neutral-100">
        {/* Hero */}
        <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=2000&auto=format&fit=crop" 
                    alt="Arena Solar" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Sua quadra de areia a um <span className="text-yellow-400">clique de distância.</span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                    Reserve online no Arena Solar Beach Bar. Rápido, fácil e seguro.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={() => setView('public-booking')} className="px-8 py-4 text-lg font-bold w-full sm:w-auto">
                        Reservar Agora
                    </Button>
                     <Button variant="outline" className="px-8 py-4 text-lg font-bold w-full sm:w-auto text-white border-white hover:bg-white/10 hover:text-white hover:border-white">
                        Saiba Mais
                    </Button>
                </div>
            </div>
        </div>

        {/* Features */}
        <div className="py-20 px-6 bg-neutral-900/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Por que reservar conosco?</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">Oferecemos a melhor experiência para seu esporte de areia, com instalações de primeira e um processo de reserva simplificado.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                        { icon: CreditCard, title: "Pagamento Online Seguro", desc: "Pague antecipadamente com segurança e garanta seu horário sem complicações." },
                        { icon: Award, title: "Quadras de Qualidade", desc: "Nossas quadras são mantidas profissionalmente para garantir o melhor jogo." },
                        { icon: CalendarDays, title: "Fácil Agendamento", desc: "Verifique a disponibilidade em tempo real e reserve em poucos minutos." }
                     ].map((feature, i) => (
                         <div key={i} className="bg-neutral-800/50 border border-neutral-800 p-8 rounded-2xl hover:border-yellow-400/30 transition-colors">
                             <div className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center text-yellow-400 mb-6">
                                 <feature.icon size={24} />
                             </div>
                             <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                             <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
                         </div>
                     ))}
                </div>
            </div>
        </div>
    </div>
  );
};

const PublicPromotions = () => {
  return (
    <div className="bg-neutral-900 min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Explore nossas Promoções e Eventos</h1>
            <p className="text-neutral-400">Fique por dentro das últimas ofertas e dos próximos acontecimentos no Arena Solar Beach Bar.</p>
        </div>

        <div className="bg-neutral-800/50 p-1.5 rounded-lg inline-flex gap-1 mb-12">
            <button className="px-6 py-2 bg-neutral-700/50 text-white rounded-md font-medium text-sm">Todas</button>
            <button className="px-6 py-2 text-neutral-400 hover:text-white rounded-md font-medium text-sm transition-colors">Promoções</button>
            <button className="px-6 py-2 text-neutral-400 hover:text-white rounded-md font-medium text-sm transition-colors">Eventos</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: 'Torneio de Vôlei', type: 'EVENTO', date: '15 DE AGOSTO, 09:00', price: 'R$ 50,00 por dupla. Inscrições abertas!', img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=800' },
                { title: 'Happy Hour na Areia', type: 'PROMOÇÃO', date: 'SEG A SEX, 17:00-19:00', price: 'Caipirinha em dobro e porções com 20% OFF.', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' },
                { title: 'Manhãs com Desconto', type: 'PROMOÇÃO', date: 'SEG A SEX, 08:00-11:00', price: 'Reserve sua quadra pela manhã com 30% de desconto.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' },
                { title: 'Festa de Verão Arena Solar', type: 'EVENTO', date: '28 DE AGOSTO, 18:00', price: 'Música ao vivo, drinks especiais e muita diversão.', img: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800' },
                { title: 'Pacote 10 Horas', type: 'PROMOÇÃO', date: 'VÁLIDO POR 30 DIAS', price: 'Compre um pacote de 10 horas e pague apenas 8.', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800' },
                { title: 'Workshop de Futevôlei', type: 'EVENTO', date: '20 DE AGOSTO, 10:00', price: 'Aprenda os fundamentos com nosso instrutor profissional.', img: 'https://images.unsplash.com/photo-1526232353130-9b6f84d642b5?auto=format&fit=crop&q=80&w=800' },
            ].map((card, i) => (
                <div key={i} className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-colors group">
                    <div className="h-48 overflow-hidden relative">
                         <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                        <p className="text-xs font-bold text-yellow-400 uppercase mb-2">{card.type} - {card.date}</p>
                        <p className="text-neutral-400 text-sm">{card.price}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

const PublicContact = () => (
  <div className="bg-neutral-900 min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Fale Conosco</h1>
        <p className="text-neutral-400 mb-12">Tem alguma dúvida ou sugestão? Entre em contato conosco.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-8">Nossos Contatos</h3>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-6 bg-neutral-800 rounded-xl border border-neutral-700">
                             <div className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center text-yellow-400">
                                 <Phone size={24} />
                             </div>
                             <div>
                                 <p className="text-white font-medium text-lg">(11) 99999-8888</p>
                                 <p className="text-yellow-400 text-sm font-medium cursor-pointer">Ligar agora</p>
                             </div>
                        </div>
                         <div className="flex items-center gap-4 p-6 bg-neutral-800 rounded-xl border border-neutral-700">
                             <div className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center text-yellow-400">
                                 <Mail size={24} />
                             </div>
                             <div>
                                 <p className="text-white font-medium text-lg">contato@arenasolar.com</p>
                                 <p className="text-yellow-400 text-sm font-medium cursor-pointer">Enviar e-mail</p>
                             </div>
                        </div>
                         <div className="flex items-center gap-4 p-6 bg-neutral-800 rounded-xl border border-neutral-700">
                             <div className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center text-yellow-400">
                                 <MapPin size={24} />
                             </div>
                             <div>
                                 <p className="text-white font-medium text-lg">Av. Praia Sol, 123, Maresias, SP</p>
                                 <p className="text-yellow-400 text-sm font-medium cursor-pointer">Ver mapa</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                 <h3 className="text-2xl font-bold text-white mb-8">Envie-nos uma Mensagem</h3>
                 <form className="space-y-6">
                     <div className="space-y-2">
                         <label className="text-sm font-medium text-neutral-300">Nome</label>
                         <input type="text" placeholder="Seu nome completo" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
                     </div>
                     <div className="space-y-2">
                         <label className="text-sm font-medium text-neutral-300">E-mail</label>
                         <input type="email" placeholder="seu.email@exemplo.com" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
                     </div>
                     <div className="space-y-2">
                         <label className="text-sm font-medium text-neutral-300">Mensagem</label>
                         <textarea rows={5} placeholder="Escreva sua mensagem aqui..." className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none resize-none" />
                     </div>
                     <Button className="w-full py-3 font-bold">Enviar Mensagem</Button>
                 </form>
            </div>
        </div>
    </div>
  </div>
)

const ClientProfile = () => (
  <div className="bg-neutral-900 min-h-screen pt-24 pb-12 px-6">
    <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Meu Perfil</h1>

        <div className="flex items-center gap-6 mb-12">
             <div className="w-24 h-24 rounded-full bg-neutral-800 border-2 border-neutral-700 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
             </div>
             <div>
                 <h3 className="text-xl font-bold text-white">Nome do Cliente</h3>
                 <p className="text-neutral-400 text-sm mb-3">cliente@email.com</p>
                 <button className="text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 px-3 py-1.5 rounded flex items-center gap-2">
                     <Camera size={14} /> Alterar Foto
                 </button>
             </div>
        </div>

        <div className="space-y-12">
            <section>
                <h3 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Nome Completo</label>
                        <input type="text" defaultValue="Nome do Cliente" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Telefone</label>
                        <input type="text" defaultValue="(99) 99999-9999" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
                    </div>
                </div>
                <Button className="mt-6">Salvar Alterações</Button>
            </section>

             <section>
                <h3 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Segurança</h3>
                <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Senha Atual</label>
                        <input type="password" placeholder="........" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Nova Senha</label>
                            <input type="password" placeholder="........" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Confirmar Nova Senha</label>
                            <input type="password" placeholder="........" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
                        </div>
                    </div>
                </div>
                <Button variant="secondary" className="mt-6">Alterar Senha</Button>
            </section>

             <section>
                <h3 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">Minhas Reservas</h3>
                <div className="space-y-4">
                     {[
                         { date: '25 de Julho, 2024 - 18:00', title: 'Reserva - Quadra 1', status: 'Confirmada', color: 'text-green-400 bg-green-900/20' },
                         { date: '18 de Julho, 2024 - 19:00', title: 'Reserva - Quadra 2', status: 'Finalizada', color: 'text-neutral-400 bg-neutral-800' },
                         { date: '10 de Julho, 2024 - 20:00', title: 'Reserva - Quadra 1', status: 'Cancelada', color: 'text-red-400 bg-red-900/20' }
                     ].map((item, i) => (
                         <div key={i} className="bg-neutral-800/50 border border-neutral-800 p-4 rounded-lg flex justify-between items-center">
                             <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded bg-yellow-400/10 flex items-center justify-center text-yellow-400">
                                     <Volleyball size={18} />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                     <p className="text-neutral-500 text-xs">{item.date}</p>
                                 </div>
                             </div>
                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>{item.status}</span>
                         </div>
                     ))}
                </div>
            </section>

            <section>
                 <h3 className="text-xl font-bold text-red-400 mb-6 border-b border-neutral-800 pb-2">Zona de Perigo</h3>
                 <p className="text-neutral-400 text-sm mb-4">Uma vez que sua conta for excluída, não há como voltar atrás. Por favor, tenha certeza.</p>
                 <Button variant="danger" className="bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-900/40">Excluir Minha Conta</Button>
            </section>
        </div>
    </div>
  </div>
)

const ClientBookings = () => (
    <div className="bg-neutral-900 min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                 <h1 className="text-3xl font-bold text-white">Meus Agendamentos</h1>
                 <Button className="text-sm">Book a Court</Button>
             </div>

             <div className="flex gap-2 overflow-x-auto pb-6">
                <button className="px-5 py-2 rounded-full bg-yellow-400 text-neutral-900 text-sm font-bold shadow-lg shadow-yellow-400/20">Todos</button>
                <button className="px-5 py-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white text-sm font-medium border border-neutral-700">Pendente</button>
                <button className="px-5 py-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white text-sm font-medium border border-neutral-700">Pago</button>
                <button className="px-5 py-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white text-sm font-medium border border-neutral-700">Cancelado</button>
             </div>

             <div className="space-y-6">
                  {/* Card 1 */}
                 <div className="bg-neutral-800/40 border border-neutral-700 rounded-2xl overflow-hidden flex flex-col md:flex-row group hover:border-yellow-400/30 transition-all">
                     <div className="flex-1 p-8 flex flex-col justify-between">
                         <div>
                             <span className="text-yellow-400 font-bold text-sm mb-2 block">Pendente</span>
                             <h3 className="text-2xl font-bold text-white mb-2">Quadra 1</h3>
                             <p className="text-neutral-400">25 de Outubro, 2024, 18:00 - 19:00</p>
                         </div>
                         <div className="flex gap-4 mt-8">
                             <Button className="px-6">Pagar Agora</Button>
                             <button className="text-neutral-400 hover:text-white font-medium text-sm px-4">Cancelar</button>
                         </div>
                     </div>
                     <div className="w-full md:w-80 h-48 md:h-auto relative">
                         <img src="https://images.unsplash.com/photo-1626224583764-84786c71971e?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-transparent md:hidden"></div>
                         <div className="absolute inset-0 bg-gradient-to-l from-transparent to-neutral-900/80 hidden md:block"></div>
                     </div>
                 </div>

                  {/* Card 2 */}
                 <div className="bg-neutral-800/40 border border-neutral-700 rounded-2xl overflow-hidden flex flex-col md:flex-row group hover:border-yellow-400/30 transition-all">
                     <div className="flex-1 p-8 flex flex-col justify-between">
                         <div>
                             <span className="text-green-400 font-bold text-sm mb-2 block">Pago</span>
                             <h3 className="text-2xl font-bold text-white mb-2">Quadra 2</h3>
                             <p className="text-neutral-400">28 de Outubro, 2024, 20:00 - 21:00</p>
                         </div>
                         <div className="flex gap-4 mt-8">
                             <Button variant="secondary" className="px-6">Detalhes</Button>
                             <button className="text-neutral-400 hover:text-white font-medium text-sm px-4">Cancelar</button>
                         </div>
                     </div>
                     <div className="w-full md:w-80 h-48 md:h-auto relative">
                         <img src="https://images.unsplash.com/photo-1592656094267-764a45160876?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-l from-transparent to-neutral-900/80 hidden md:block"></div>
                     </div>
                 </div>
                 
                  {/* Empty State Mockup */}
                  <div className="border border-dashed border-neutral-800 rounded-2xl p-12 text-center bg-neutral-900/50">
                       <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-500">
                           <CalendarDays size={32} />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">Sem agendamentos futuros</h3>
                       <p className="text-neutral-400 mb-6">Você ainda não tem agendamentos. Que tal reservar uma quadra e aproveitar o sol?</p>
                       <Button className="bg-yellow-400">Reservar uma Quadra</Button>
                  </div>
             </div>
        </div>
    </div>
)


const PublicBooking = ({ setView }: { setView: (v: ViewState) => void }) => {
    // Mocking the complex grid state
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    const courts = ['Quadra 1', 'Quadra 2', 'Quadra 3'];
    
    // Changed to array to support multiple selections
    const [selectedSlots, setSelectedSlots] = useState<{court: string, hour: string}[]>([]);

    const isOccupied = (court: string, hour: string) => {
        // Randomly simulate occupied
        return (court === 'Quadra 1' && hour === '10:00') || (court === 'Quadra 2' && hour === '15:00'); 
    };

    const toggleSlot = (court: string, hour: string) => {
        const isSelected = selectedSlots.some(s => s.court === court && s.hour === hour);
        if (isSelected) {
            setSelectedSlots(selectedSlots.filter(s => !(s.court === court && s.hour === hour)));
        } else {
            setSelectedSlots([...selectedSlots, {court, hour}]);
        }
    };

    const handleReserve = () => {
        // Assuming if user is on this screen, they are not logged in as client/admin in this demo flow
        alert("Você precisa fazer login para finalizar a reserva.");
        setView('login');
    };

    const totalPrice = selectedSlots.length * 90;
    const totalHours = selectedSlots.length;

    // Helper to summarize selected courts
    const selectedCourtsSummary = Array.from(new Set(selectedSlots.map(s => s.court))).sort().join(', ');

    return (
        <div className="bg-neutral-900 min-h-screen pt-24 px-4 pb-12">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Agende sua Quadra</h1>
                        <p className="text-neutral-400">Selecione um ou mais horários disponíveis na grade para reservar.</p>
                    </div>
                    <div className="bg-neutral-800 flex items-center gap-4 px-4 py-3 rounded-xl border border-neutral-700 cursor-pointer hover:border-neutral-600 transition-colors">
                         <ChevronDown size={20} className="rotate-90 text-neutral-500"/>
                         <div className="flex items-center gap-3 text-white font-medium">
                             <CalendarDays size={20} className="text-yellow-400" />
                             <span>Hoje, 24 de Julho</span>
                         </div>
                         <ChevronDown size={20} className="-rotate-90 text-neutral-500"/>
                    </div>
                </div>

                {/* Filters & Legend */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 gap-4">
                     <div className="flex items-center gap-3 text-neutral-300 bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 cursor-pointer hover:text-white hover:border-neutral-600 transition-all w-full md:w-auto justify-between md:justify-start">
                         <div className="flex items-center gap-2">
                            <Menu size={18} />
                            <span className="text-sm font-medium">Todas as quadras</span>
                         </div>
                         <ChevronDown size={16} />
                     </div>
                     
                     <div className="flex flex-wrap justify-center gap-6 text-sm">
                         <div className="flex items-center gap-2 text-neutral-400">
                             <div className="w-3 h-3 rounded-full border border-yellow-400/50"></div> 
                             <span>Disponível</span>
                         </div>
                         <div className="flex items-center gap-2 text-neutral-400">
                             <div className="w-3 h-3 rounded-full bg-yellow-400"></div> 
                             <span>Selecionado</span>
                         </div>
                         <div className="flex items-center gap-2 text-neutral-400">
                             <div className="w-3 h-3 rounded-full bg-neutral-700"></div> 
                             <span>Ocupado</span>
                         </div>
                         <div className="flex items-center gap-2 text-neutral-400">
                             <div className="w-3 h-3 rounded-full border border-neutral-700"></div> 
                             <span>Passado</span>
                         </div>
                     </div>
                </div>

                {/* Grid */}
                <div className="bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                    <div className="grid grid-cols-10 border-b border-neutral-700 bg-neutral-900/50">
                        <div className="col-span-1 p-5 text-neutral-500 text-xs font-bold uppercase tracking-wider border-r border-neutral-700">Quadra</div>
                        {hours.map(h => (
                            <div key={h} className="col-span-1 p-5 text-center text-neutral-500 text-xs font-bold border-r border-neutral-700 last:border-r-0">{h}</div>
                        ))}
                    </div>
                    {courts.map((court, index) => (
                        <div key={court} className={`grid grid-cols-10 h-20 ${index !== courts.length - 1 ? 'border-b border-neutral-700' : ''}`}>
                            <div className="col-span-1 px-5 flex items-center text-white text-sm font-semibold border-r border-neutral-700 bg-neutral-800/30">
                                {court}
                            </div>
                            {hours.map(h => {
                                const occupied = isOccupied(court, h);
                                const selected = selectedSlots.some(s => s.court === court && s.hour === h);
                                
                                return (
                                    <div 
                                        key={`${court}-${h}`} 
                                        className={`col-span-1 border-r border-neutral-700 last:border-r-0 relative group ${occupied ? 'bg-neutral-900/50 cursor-not-allowed' : 'hover:bg-white/5 cursor-pointer'}`}
                                        onClick={() => !occupied && toggleSlot(court, h)}
                                    >
                                        {/* Selection Block */}
                                        {selected && (
                                            <div className="absolute inset-1 bg-yellow-400 rounded-md flex items-center justify-center shadow-lg z-10 animate-in zoom-in duration-200">
                                                <span className="text-neutral-900 font-bold text-sm">{h}</span>
                                            </div>
                                        )}
                                        
                                        {/* Available Line */}
                                        {!selected && !occupied && (
                                            <div className="absolute top-1/2 left-2 right-2 h-[2px] bg-yellow-400/20 group-hover:bg-yellow-400/50 transition-colors rounded-full"></div>
                                        )}

                                        {/* Occupied State */}
                                        {occupied && !selected && (
                                             <div className="w-full h-full flex items-center justify-center">
                                                 <div className="w-full mx-4 h-[2px] bg-neutral-700"></div>
                                             </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* Summary Card */}
                <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-xl font-bold text-white mb-8">Resumo da sua Reserva</h2>
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                            <div>
                                <p className="text-neutral-500 text-sm mb-2">Data</p>
                                <p className="text-white font-medium text-lg">24 de Julho de 2024</p>
                            </div>
                            <div>
                                <p className="text-neutral-500 text-sm mb-2">Quadra(s)</p>
                                <p className="text-white font-medium text-lg truncate" title={selectedCourtsSummary || '-'}>
                                    {selectedCourtsSummary || '-'}
                                </p>
                            </div>
                            <div>
                                <p className="text-neutral-500 text-sm mb-2">Horários</p>
                                <p className="text-white font-medium text-lg">
                                    {selectedSlots.length > 0 
                                        ? `${selectedSlots.length} selecionado(s)` 
                                        : '-'
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-neutral-500 text-sm mb-2">Duração Total</p>
                                <p className="text-white font-medium text-lg">{totalHours} horas</p>
                            </div>
                        </div>

                        <div className="border-t lg:border-t-0 lg:border-l border-neutral-700 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-between min-w-[280px]">
                             <div className="mb-6">
                                <p className="text-neutral-500 text-sm mb-1">Valor Total</p>
                                <div className="text-4xl font-bold text-yellow-400">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
                                </div>
                                <p className="text-neutral-500 text-sm mt-1">R$ 90,00 por hora</p>
                             </div>
                             <Button 
                                onClick={handleReserve}
                                disabled={selectedSlots.length === 0}
                                className="w-full py-4 text-lg font-bold flex items-center justify-between px-6 group hover:bg-yellow-300 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:hover:bg-neutral-700"
                             >
                                Confirmar e Pagar 
                                <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${selectedSlots.length === 0 ? 'hidden' : ''}`} />
                             </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const App = () => {
  const [viewState, setViewState] = useState<ViewState>('public-home');

  const renderContent = () => {
    switch (viewState) {
      case 'public-home':
        return <PublicHome setView={setViewState} />;
      case 'public-booking':
        return <PublicBooking setView={setViewState} />;
      case 'public-promotions':
        return <PublicPromotions />;
      case 'public-contact':
        return <PublicContact />;
      case 'client-bookings':
        return <ClientBookings />;
      case 'client-profile':
        return <ClientProfile />;
      case 'login':
        return (
          <div className="bg-neutral-900 min-h-screen flex items-center justify-center p-4">
             <div className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 w-full max-w-md">
                 <div className="text-center mb-8">
                     <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center text-neutral-900 mx-auto mb-4">
                        <Volleyball size={24} />
                     </div>
                     <h2 className="text-2xl font-bold text-white">Bem-vindo de volta</h2>
                     <p className="text-neutral-400">Acesse sua conta para continuar</p>
                 </div>
                 
                 <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Email</label>
                        <input type="email" placeholder="seu@email.com" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Senha</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none" />
                     </div>
                     <Button className="w-full py-3 font-bold" onClick={() => setViewState('admin-dashboard')}>Entrar (Demo Admin)</Button>
                     <Button variant="outline" className="w-full py-3 font-bold" onClick={() => setViewState('client-bookings')}>Entrar (Demo Cliente)</Button>
                 </div>
                 
                 <button onClick={() => setViewState('public-home')} className="w-full text-center mt-8 text-neutral-500 hover:text-white text-sm">
                     Voltar ao início
                 </button>
             </div>
          </div>
        );
      case 'admin-dashboard':
        return <Dashboard />;
      case 'admin-reservations':
        return <Reservations />;
      case 'admin-financial':
        return <Financial />;
      case 'admin-clients':
        return <div className="p-8 text-white">Gestão de Clientes (Em breve)</div>;
      case 'admin-settings':
        return <div className="p-8 text-white">Configurações do Sistema (Em breve)</div>;
      default:
        return <PublicHome setView={setViewState} />;
    }
  };

  const isPublic = viewState.startsWith('public-');
  const isClient = viewState.startsWith('client-');
  const isLogin = viewState === 'login';
  const isAdmin = viewState.startsWith('admin-');

  if (isLogin) return renderContent();

  return (
    <div className="bg-neutral-900 min-h-screen flex text-neutral-100 font-sans">
      {isAdmin && <AdminSidebar currentView={viewState} setView={setViewState} />}
      
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isAdmin ? 'md:ml-64' : ''}`}>
        {(isPublic || isClient) && <PublicNavbar currentView={viewState} setView={setViewState} />}
        
        {isAdmin && <AdminHeader title={
            viewState === 'admin-dashboard' ? 'Visão Geral' :
            viewState === 'admin-reservations' ? 'Gerenciar Reservas' :
            viewState === 'admin-financial' ? 'Financeiro' :
            viewState === 'admin-clients' ? 'Clientes' : 'Configurações'
        } />}
        
        <main className={`flex-1 ${isAdmin ? 'p-8 overflow-y-auto' : ''}`}>
          {renderContent()}
        </main>

        {(isPublic || isClient) && <Footer />}
      </div>
    </div>
  );
};

export default App;