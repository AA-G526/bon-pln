
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SparePartItem } from '@/types';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: SparePartItem | null;
  onSave: (item: SparePartItem) => void;
}

const ItemModal = ({ isOpen, onClose, item, onSave }: ItemModalProps) => {
  const [formData, setFormData] = useState<SparePartItem>({
    namaBarang: '',
    hargaSTN: 0,
    qty: 1,
    satuan: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setFormData(item);
      } else {
        setFormData({
          namaBarang: '',
          hargaSTN: 0,
          qty: 1,
          satuan: ''
        });
      }
    }
  }, [item, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.namaBarang && formData.hargaSTN > 0 && formData.qty > 0 && formData.satuan) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (field: keyof SparePartItem, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-800">
            {item ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="namaBarang">Nama Barang/Jasa</Label>
              <Input
                id="namaBarang"
                value={formData.namaBarang}
                onChange={(e) => handleChange('namaBarang', e.target.value)}
                placeholder="Enter item/service name"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="hargaSTN">Harga STN (Rp)</Label>
                <Input
                  id="hargaSTN"
                  type="number"
                  value={formData.hargaSTN}
                  onChange={(e) => handleChange('hargaSTN', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="qty">Quantity</Label>
                <Input
                  id="qty"
                  type="number"
                  value={formData.qty}
                  onChange={(e) => handleChange('qty', parseInt(e.target.value) || 1)}
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="satuan">Satuan</Label>
              <Input
                id="satuan"
                value={formData.satuan}
                onChange={(e) => handleChange('satuan', e.target.value)}
                placeholder="e.g., pcs, unit, set"
                required
              />
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <Label className="text-sm font-semibold">Total Harga:</Label>
              <p className="text-lg font-bold text-blue-900">
                Rp {(formData.hargaSTN * formData.qty).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {item ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;
