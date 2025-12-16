import React, { useState, useEffect } from 'react';
import { Heart, Activity, Stethoscope, FileText, TrendingUp, Calendar, Plus, ChevronRight, AlertCircle, Download } from 'lucide-react';

const HealthMonitorApp = () => {
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [patients, setPatients] = useState([]);
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: 0,
    bloodPressure: { systolic: 0, diastolic: 0 },
    temperature: 0,
    spo2: 0
  });
  const [ecgData, setEcgData] = useState([]);
  const [examinations, setExaminations] = useState([]);

  // Giả lập dữ liệu bệnh nhân
  useEffect(() => {
    setPatients([
      { id: 1, name: 'Nguyễn Văn A', age: 45, condition: 'Tăng huyết áp', lastVisit: '2024-12-10' },
      { id: 2, name: 'Trần Thị B', age: 52, condition: 'Tiểu đường', lastVisit: '2024-12-12' },
      { id: 3, name: 'Lê Văn C', age: 38, condition: 'Bệnh tim', lastVisit: '2024-12-15' }
    ]);

    setExaminations([
      { id: 1, patientId: 1, type: 'Mạn tính', date: '2024-12-10', notes: 'Huyết áp ổn định' },
      { id: 2, patientId: 2, type: 'Dự phòng', date: '2024-12-12', notes: 'Đường huyết bình thường' }
    ]);
  }, []);

  // Giả lập đọc dữ liệu từ thiết bị
  const simulateDeviceRead = () => {
    setVitalSigns({
      heartRate: Math.floor(Math.random() * 40) + 60,
      bloodPressure: {
        systolic: Math.floor(Math.random() * 30) + 110,
        diastolic: Math.floor(Math.random() * 20) + 70
      },
      temperature: (Math.random() * 2 + 36).toFixed(1),
      spo2: Math.floor(Math.random() * 5) + 95
    });

    // Giả lập dữ liệu ECG
    const newEcgData = Array.from({ length: 50 }, (_, i) => ({
      x: i,
      y: Math.sin(i * 0.3) * 30 + Math.random() * 10 + 50
    }));
    setEcgData(newEcgData);
  };

  const renderHome = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Chào mừng đến với HealthCare</h2>
        <p className="text-blue-100">Quản lý sức khỏe thông minh và toàn diện</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Heart className="text-red-500" size={32} />
            <span className="text-2xl font-bold">{patients.length}</span>
          </div>
          <p className="text-gray-600 text-sm">Bệnh nhân</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <FileText className="text-blue-500" size={32} />
            <span className="text-2xl font-bold">{examinations.length}</span>
          </div>
          <p className="text-gray-600 text-sm">Lần khám</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="font-semibold mb-3 flex items-center">
          <Calendar className="mr-2 text-blue-500" size={20} />
          Bệnh nhân gần đây
        </h3>
        <div className="space-y-2">
          {patients.slice(0, 3).map(patient => (
            <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-500">{patient.condition}</p>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChronicExam = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="font-semibold mb-4 flex items-center">
          <Stethoscope className="mr-2 text-blue-500" size={20} />
          Thăm khám bệnh mạn tính
        </h3>

        <button
          onClick={simulateDeviceRead}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium mb-4 hover:bg-blue-600 transition"
        >
          Đọc dữ liệu từ thiết bị
        </button>

        {vitalSigns.heartRate > 0 && (
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Nhịp tim</span>
                <span className="text-2xl font-bold text-red-600">{vitalSigns.heartRate} bpm</span>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Huyết áp</span>
                <span className="text-2xl font-bold text-purple-600">
                  {vitalSigns.bloodPressure.systolic}/{vitalSigns.bloodPressure.diastolic}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">SpO2</span>
                <span className="text-2xl font-bold text-blue-600">{vitalSigns.spo2}%</span>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Nhiệt độ</span>
                <span className="text-2xl font-bold text-orange-600">{vitalSigns.temperature}°C</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {ecgData.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold mb-3 flex items-center">
            <Activity className="mr-2 text-green-500" size={20} />
            Điện tâm đồ (ECG)
          </h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-hidden">
            <svg width="100%" height="150" viewBox="0 0 300 150">
              <polyline
                points={ecgData.map(point => `${point.x * 6},${150 - point.y}`).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <AlertCircle size={16} className="mr-2" />
            <span>ECG bình thường - Không phát hiện bất thường</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderPreventiveExam = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="font-semibold mb-4 flex items-center">
          <Heart className="mr-2 text-pink-500" size={20} />
          Khám sức khỏe dự phòng
        </h3>

        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn bệnh nhân
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2">
              <option>-- Chọn bệnh nhân --</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {patient.age} tuổi
                </option>
              ))}
            </select>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại khám
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Khám tổng quát</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Xét nghiệm máu</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Đo điện tim</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Chụp X-quang</span>
              </label>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="4"
              placeholder="Nhập ghi chú về khám dự phòng..."
            ></textarea>
          </div>

          <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition">
            Lưu lịch khám
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h3 className="font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-500" size={20} />
          Phân tích dữ liệu
        </h3>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-3">Thống kê chung</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Tổng khám</p>
                <p className="text-2xl font-bold text-blue-600">245</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Tuần này</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-3">Xu hướng bệnh</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tăng huyết áp</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tiểu đường</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bệnh tim</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-sm font-medium">30%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-3">Chỉ số trung bình</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Nhịp tim TB</span>
                <span className="font-bold">72 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Huyết áp TB</span>
                <span className="font-bold">125/80</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">SpO2 TB</span>
                <span className="font-bold">97%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Download className="mr-3" size={24} />
              <div>
                <p className="font-semibold">Cài đặt ứng dụng</p>
                <p className="text-sm text-green-100">Thêm vào màn hình chính để truy cập nhanh</p>
              </div>
            </div>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-white font-bold text-xl"
            >
              ×
            </button>
          </div>
          <div className="mt-3 bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-sm font-medium mb-2">Hướng dẫn cài đặt trên Android:</p>
            <ol className="text-sm space-y-1 text-green-50">
              <li>1. Nhấn nút Menu (⋮) trên trình duyệt</li>
              <li>2. Chọn "Add to Home screen" / "Thêm vào màn hình chính"</li>
              <li>3. Nhấn "Add" / "Thêm"</li>
              <li>4. App sẽ xuất hiện như ứng dụng thật trên màn hình</li>
            </ol>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-xl font-bold">HealthCare Pro</h1>
        <p className="text-sm text-blue-100">Quản lý sức khỏe thông minh</p>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'chronic' && renderChronicExam()}
        {activeTab === 'preventive' && renderPreventiveExam()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-3 ${
              activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Heart size={24} />
            <span className="text-xs mt-1">Trang chủ</span>
          </button>
          <button
            onClick={() => setActiveTab('chronic')}
            className={`flex flex-col items-center py-3 ${
              activeTab === 'chronic' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Activity size={24} />
            <span className="text-xs mt-1">Mạn tính</span>
          </button>
          <button
            onClick={() => setActiveTab('preventive')}
            className={`flex flex-col items-center py-3 ${
              activeTab === 'preventive' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Stethoscope size={24} />
            <span className="text-xs mt-1">Dự phòng</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center py-3 ${
              activeTab === 'analytics' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <TrendingUp size={24} />
            <span className="text-xs mt-1">Phân tích</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitorApp;