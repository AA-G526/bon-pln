
import { CustomerInfo, SparePartItem } from '@/types';

interface PrintableReportProps {
  customerInfo: CustomerInfo;
  sparePartItems: SparePartItem[];
}

const PrintableReport = ({ customerInfo, sparePartItems }: PrintableReportProps) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const grandTotal = sparePartItems.reduce((total, item) => total + (item.hargaSTN * item.qty), 0);

  return (
    <div id="printable-report" className="bg-white p-8 max-w-4xl mx-auto print:p-4">
      {/* Header */}
      <div className="text-center mb-8 pb-4 border-b-2 border-blue-900">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          LAPORAN PENGGUNAAN PERALATAN PLN
        </h1>
        <p className="text-gray-600">PT PLN (Persero) - Perusahaan Listrik Negara</p>
        <p className="text-sm text-gray-500 mt-2">Tanggal: {currentDate}</p>
      </div>

      {/* Customer Information */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-blue-800 mb-4 pb-2 border-b border-gray-300">
          INFORMASI PELANGGAN
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">Nama:</span>
              <span>{customerInfo.nama || '-'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">ID Pelanggan:</span>
              <span>{customerInfo.idPelanggan || '-'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Daya:</span>
              <span>{customerInfo.daya || '-'}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold w-32">Pekerjaan:</span>
              <span>{customerInfo.pekerjaan || '-'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">No. Kontrak:</span>
              <span>{customerInfo.nomorKontrak || '-'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-blue-800 mb-4 pb-2 border-b border-gray-300">
          DAFTAR BARANG/JASA
        </h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-400 p-3 text-left font-semibold">No</th>
              <th className="border border-gray-400 p-3 text-left font-semibold">Nama Barang/Jasa</th>
              <th className="border border-gray-400 p-3 text-right font-semibold">Harga STN</th>
              <th className="border border-gray-400 p-3 text-center font-semibold">Qty</th>
              <th className="border border-gray-400 p-3 text-center font-semibold">Satuan</th>
              <th className="border border-gray-400 p-3 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {sparePartItems.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-3 text-center">{index + 1}</td>
                <td className="border border-gray-400 p-3">{item.namaBarang}</td>
                <td className="border border-gray-400 p-3 text-right">
                  Rp {item.hargaSTN.toLocaleString('id-ID')}
                </td>
                <td className="border border-gray-400 p-3 text-center">{item.qty}</td>
                <td className="border border-gray-400 p-3 text-center">{item.satuan}</td>
                <td className="border border-gray-400 p-3 text-right font-semibold">
                  Rp {(item.hargaSTN * item.qty).toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
            {sparePartItems.length === 0 && (
              <tr>
                <td colSpan={6} className="border border-gray-400 p-8 text-center text-gray-500">
                  Tidak ada data barang/jasa
                </td>
              </tr>
            )}
          </tbody>
          {sparePartItems.length > 0 && (
            <tfoot>
              <tr className="bg-blue-50">
                <td colSpan={5} className="border border-gray-400 p-3 text-right font-bold">
                  TOTAL KESELURUHAN:
                </td>
                <td className="border border-gray-400 p-3 text-right font-bold text-blue-900 text-lg">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Footer */}
      <div className="mt-12 grid grid-cols-2 gap-8">
        <div className="text-center">
          <p className="mb-16">Mengetahui,</p>
          <div className="border-t border-gray-400 pt-2">
            <p className="font-semibold">Petugas PLN</p>
          </div>
        </div>
        <div className="text-center">
          <p className="mb-16">Pelanggan,</p>
          <div className="border-t border-gray-400 pt-2">
            <p className="font-semibold">{customerInfo.nama || '_______________'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableReport;
