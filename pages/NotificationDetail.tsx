import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationDetail: React.FC = () => {
  const navigate = useNavigate();

  // Mock data matching the design
  const notification = {
    title: "Thông báo về lịch cắt điện toàn khu KTX",
    sender: "Ban Quản lý",
    date: "24/12/2023",
    time: "08:30",
    attachments: [
      { name: "lich-cat-dien-chi-tiet.pdf", size: "128 KB", type: "description" },
      { name: "so-do-khu-vuc.jpg", size: "1.2 MB", type: "image" }
    ]
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light font-sans">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex h-16 items-center border-b border-slate-200 bg-background-light/95 backdrop-blur-sm px-4 shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
        </div>
        <h2 className="text-lg font-bold text-slate-900 flex-1 text-center pr-10">Chi tiết Thông báo</h2>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-6 pb-8">
        <div className="mx-auto max-w-2xl">
          {/* Main Info Area */}
          <div className="mb-6">
            <h1 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight">
              {notification.title}
            </h1>
            <p className="text-slate-500 text-sm font-normal leading-normal pt-2">
              Người gửi: {notification.sender} | {notification.date} {notification.time}
            </p>
          </div>

          {/* Content Area */}
          <article className="text-slate-700 text-base font-normal leading-relaxed space-y-4">
            <p>Thân gửi các bạn sinh viên,</p>
            <p>
              Nhằm mục đích bảo trì và nâng cấp hệ thống lưới điện, Ban Quản lý ký túc xá xin thông báo về việc tạm ngừng cung cấp điện tại toàn bộ các khu nhà.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900">Thời gian dự kiến:</strong> Từ 08:00 đến 17:00 ngày 25/12/2023.
              </li>
              <li>
                <strong className="text-slate-900">Khu vực ảnh hưởng:</strong> Toàn bộ các tòa nhà A, B, và C.
              </li>
            </ul>
            <p>
              Rất mong các bạn sinh viên chú ý sắp xếp công việc và học tập. Vui lòng rút phích cắm các thiết bị điện không cần thiết trước thời gian cắt điện để đảm bảo an toàn.
            </p>
            <p>Xin cảm ơn.</p>
          </article>

          {/* Images Section */}
          <div className="mt-6">
            <div className="flex w-full overflow-hidden rounded-xl">
               {/* Using a placeholder image similar to the design */}
               <img 
                 src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop" 
                 alt="Notification Banner" 
                 className="w-full h-auto object-cover aspect-video"
               />
            </div>
          </div>

          {/* Attachments Area */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tệp đính kèm</h3>
            <div className="space-y-3">
              {notification.attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-4 rounded-xl border border-border-light bg-white p-3 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-xl">{file.type}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-900">{file.name}</p>
                    <p className="text-xs text-slate-500">{file.size}</p>
                  </div>
                  <button className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-xl">download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationDetail;