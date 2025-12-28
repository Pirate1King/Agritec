import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-light mt-16">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-blue">AGRITEC</p>
          <p className="text-sm text-slate-600">
            CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ AGRITEC - Giải pháp xử lý nước, sát trùng và sinh học cho trang trại.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Hỗ trợ</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <Link className="block" href="/dat-hang">
              Đặt hàng
            </Link>
            <Link className="block" href="https://zalo.me/0977791412" target="_blank">
              Zalo: 0977 791 412
            </Link>
            <p className="block">Điện thoại: 0846 411 968</p>
            <Link className="block" href="mailto:hello@agritec.vn">
              Email: hello@agritec.vn
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Doanh nghiệp</h4>
          <div className="mt-3 text-sm text-slate-600 space-y-1">
            <p>MST: 3703096325</p>
            <p>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ AGRITEC</p>
            <p>Địa chỉ: 61/6 Đông Tác, Kp Đông Tác, P. Dĩ An, TP. Hồ Chí Minh</p>
            <p>Đại diện: Nguyễn Tiến Hùng</p>
          </div>
        </div>
      </div>
      <div className="border-t border-surface-border py-6">
        <div className="container flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Agritec. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
