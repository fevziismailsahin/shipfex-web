import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Truck, Plus } from 'lucide-react';
import { api } from '../services/api';

interface ShipmentEvent {
  id: number;
  status: string;
  location: string;
  created_at: string;
}

export default function Tracking() {
  const { id } = useParams(); // URL'den sipariş ID'sini al
  const navigate = useNavigate();
  const [events, setEvents] = useState<ShipmentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Yeni olay ekleme formu
  const [newEvent, setNewEvent] = useState({ status: "Yolda", location: "" });

  const fetchHistory = async () => {
    try {
      const data = await api.getOrderTracking(Number(id));
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (id) fetchHistory(); }, [id]);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.addOrderTracking(Number(id), newEvent);
    setNewEvent({ status: "Yolda", location: "" });
    fetchHistory();
  };

  // Tarih formatlayıcı
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
    }).format(date);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* BAŞLIK VE GERİ BUTONU */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/dashboard/orders')} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kargo Takip: #{id}</h1>
          <p className="text-slate-500 text-sm">Siparişin lojistik hareketlerini izleyin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SOL: ZAMAN ÇİZELGESİ (TIMELINE) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Truck size={18} className="text-indigo-600"/> Hareket Geçmişi
          </h3>
          
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-2">
            {loading ? <p className="pl-6 text-slate-400">Yükleniyor...</p> : 
             events.length === 0 ? <p className="pl-6 text-slate-400">Henüz kayıt yok.</p> :
             events.map((event, index) => (
              <div key={event.id} className="relative pl-8">
                {/* Sol taraftaki nokta */}
                <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white ${index === 0 ? 'bg-emerald-500 ring-4 ring-emerald-50' : 'bg-slate-300'}`}></div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <div>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${index === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                      {event.status}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                      <MapPin size={14} /> {event.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-mono mt-1 sm:mt-0">
                    <Clock size={12} /> {formatDate(event.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ: DURUM GÜNCELLEME FORMU */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 h-fit">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Plus size={18} className="text-indigo-600"/> Durum Güncelle
          </h3>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Durum</label>
              <select 
                className="w-full border border-slate-300 rounded-lg p-2.5 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-sm"
                value={newEvent.status}
                onChange={e => setNewEvent({...newEvent, status: e.target.value})}
              >
                <option value="Hazırlanıyor">Hazırlanıyor</option>
                <option value="Kargolandı">Kargolandı</option>
                <option value="Yolda">Yolda</option>
                <option value="Dağıtımda">Dağıtımda</option>
                <option value="Teslim Edildi">Teslim Edildi</option>
                <option value="Gecikme">Gecikme Var</option>
                <option value="Gümrükte">Gümrükte</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Konum</label>
              <input 
                className="w-full border border-slate-300 rounded-lg p-2.5 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                placeholder="Örn: Ankara Transfer Merkezi"
                value={newEvent.location}
                onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                required 
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition text-sm shadow-md shadow-indigo-100">
              Güncelle
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}