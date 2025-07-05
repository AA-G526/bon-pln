import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit3, Trash2, Download, FileText } from 'lucide-react';
import CustomerModal from '@/components/CustomerModal';
import ItemModal from '@/components/ItemModal';
import PrintableReport from '@/components/PrintableReport';
import { exportToPDF } from '@/utils/exportUtils';
import { CustomerInfo, SparePartItem } from '@/types';

const Index = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    nama: '',
    idPelanggan: '',
    daya: '',
    pekerjaan: '',
    nomorKontrak: ''
  });

  const [sparePartItems, setSparePartItems] = useState<SparePartItem[]>([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SparePartItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCustomer = localStorage.getItem('pln-customer-info');
    const savedItems = localStorage.getItem('pln-spare-parts');

    if (savedCustomer) {
      setCustomerInfo(JSON.parse(savedCustomer));
    }

    if (savedItems) {
      setSparePartItems(JSON.parse(savedItems));
    }
  }, []);

  // Save customer info to localStorage
  const saveCustomerInfo = (info: CustomerInfo) => {
    setCustomerInfo(info);
    localStorage.setItem('pln-customer-info', JSON.stringify(info));
  };

  // Save spare parts to localStorage
  const saveSparePartItems = (items: SparePartItem[]) => {
    setSparePartItems(items);
    localStorage.setItem('pln-spare-parts', JSON.stringify(items));
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setEditingIndex(null);
    setShowItemModal(true);
  };

  const handleEditItem = (item: SparePartItem, index: number) => {
    setEditingItem(item);
    setEditingIndex(index);
    setShowItemModal(true);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = sparePartItems.filter((_, i) => i !== index);
    saveSparePartItems(newItems);
  };

  const handleSaveItem = (item: SparePartItem) => {
    let newItems;
    if (editingIndex !== null) {
      newItems = [...sparePartItems];
      newItems[editingIndex] = item;
    } else {
      newItems = [...sparePartItems, item];
    }
    saveSparePartItems(newItems);
    setShowItemModal(false);
  };

  const handleExportPDF = () => {
    exportToPDF(customerInfo, sparePartItems);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            PLN Usage Report Generator
          </h1>
          <p className="text-gray-600">
            Generate professional usage reports for PLN equipment and services
          </p>
        </div>

        {/* Customer Information Card */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-blue-800">Customer Information</CardTitle>
            <Button
              onClick={() => setShowCustomerModal(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Info
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Nama</label>
                <p className="text-gray-900">{customerInfo.nama || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">ID Pelanggan</label>
                <p className="text-gray-900">{customerInfo.idPelanggan || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Daya</label>
                <p className="text-gray-900">{customerInfo.daya || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Pekerjaan</label>
                <p className="text-gray-900">{customerInfo.pekerjaan || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Nomor Kontrak</label>
                <p className="text-gray-900">{customerInfo.nomorKontrak || 'Not set'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spare Parts Table Card */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-blue-800">Spare Parts & Services</CardTitle>
            <Button
              onClick={handleAddItem}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left text-sm font-semibold">No</th>
                    <th className="border border-gray-300 p-2 text-left text-sm font-semibold">Nama Barang</th>
                    <th className="border border-gray-300 p-2 text-left text-sm font-semibold">Harga STN</th>
                    <th className="border border-gray-300 p-2 text-left text-sm font-semibold">Qty</th>
                    <th className="border border-gray-300 p-2 text-left text-sm font-semibold">Satuan</th>
                    <th className="border border-gray-300 p-2 text-left text-sm font-semibold">Total</th>
                    <th className="border border-gray-300 p-2 text-center text-sm font-semibold no-print">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sparePartItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 text-sm">{index + 1}</td>
                      <td className="border border-gray-300 p-2 text-sm">{item.namaBarang}</td>
                      <td className="border border-gray-300 p-2 text-sm">Rp {item.hargaSTN.toLocaleString('id-ID')}</td>
                      <td className="border border-gray-300 p-2 text-sm">{item.qty}</td>
                      <td className="border border-gray-300 p-2 text-sm">{item.satuan}</td>
                      <td className="border border-gray-300 p-2 text-sm font-semibold">
                        Rp {(item.hargaSTN * item.qty).toLocaleString('id-ID')}
                      </td>
                      <td className="border border-gray-300 p-2 text-center no-print">
                        <div className="flex justify-center gap-2">
                          <Button
                            onClick={() => handleEditItem(item, index)}
                            size="sm"
                            variant="outline"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteItem(index)}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {sparePartItems.length === 0 && (
                    <tr>
                      <td colSpan={7} className="border border-gray-300 p-8 text-center text-gray-500">
                        No items added yet. Click "Add Item" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
                {sparePartItems.length > 0 && (
                  <tfoot className="bg-blue-50">
                    <tr>
                      <td colSpan={5} className="border border-gray-300 p-2 text-right font-semibold">
                        Grand Total:
                      </td>
                      <td className="border border-gray-300 p-2 font-bold text-blue-900">
                        Rp {sparePartItems.reduce((total, item) => total + (item.hargaSTN * item.qty), 0).toLocaleString('id-ID')}
                      </td>
                      <td className="border border-gray-300 p-2 no-print"></td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
          <Button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            size="lg"
          >
            <Download className="w-5 h-5" />
            Export to PDF
          </Button>
          <Button
            onClick={() => window.print()}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Print Report
          </Button>
        </div>

        {/* Hidden printable report */}
        <div className="hidden">
          <PrintableReport customerInfo={customerInfo} sparePartItems={sparePartItems} />
        </div>

        {/* Modals */}
        <CustomerModal
          isOpen={showCustomerModal}
          onClose={() => setShowCustomerModal(false)}
          customerInfo={customerInfo}
          onSave={saveCustomerInfo}
        />

        <ItemModal
          isOpen={showItemModal}
          onClose={() => setShowItemModal(false)}
          item={editingItem}
          onSave={handleSaveItem}
        />
      </div>
    </div>
  );
};

export default Index;
