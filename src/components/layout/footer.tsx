import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-light mt-16">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-blue">AGRITEC</p>
          <p className="text-sm text-slate-600">
            Giải pháp nông nghiệp số cho trang trại và nhà phân phối. Thiết kế tại Việt Nam, tiêu chuẩn quốc tế.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Giải pháp</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <Link href="/giai-phap/tuoi-nho-giot-thong-minh">Tưới nhỏ giọt thông minh</Link>
            <Link href="/giai-phap/giam-sat-vi-khi-hau">Giám sát vi khí hậu</Link>
            <Link href="/giai-phap/dinh-duong-chinh-xac">Dinh dưỡng chính xác</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Hỗ trợ</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <Link href="/dat-hang">Đặt hàng</Link>
            <Link href="https://zalo.me" target="_blank">
              Tư vấn Zalo
            </Link>
            <Link href="mailto:hello@agritec.vn">hello@agritec.vn</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-800">Địa chỉ</h4>
          <p className="mt-3 text-sm text-slate-600">
            28 Innovation Hub, TP. HCM
            <br />
            Hotline: (+84) 909 000 888
          </p>
        </div>
      </div>
      <div className="border-t border-surface-border py-6">
        <div className="container flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Agritec. All rights reserved.</p>
          <p>Made for trang trại, dealers, distributors.</p>
        </div>
      </div>
    </footer>
  );
}
