
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomerInfo } from '@/types';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerInfo: CustomerInfo;
  onSave: (info: CustomerInfo) => void;
}

const CustomerModal = ({ isOpen, onClose, customerInfo, onSave }: CustomerModalProps) => {
  const [formData, setFormData] = useState<CustomerInfo>(customerInfo);

  useEffect(() => {
    setFormData(customerInfo);
  }, [customerInfo, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-800">Edit Customer Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="nama">Nama Pelanggan</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => handleChange('nama', e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            
            <div>
              <Label htmlFor="idPelanggan">ID Pelanggan</Label>
              <Input
                id="idPelanggan"
                value={formData.idPelanggan}
                onChange={(e) => handleChange('idPelanggan', e.target.value)}
                placeholder="Enter customer ID"
              />
            </div>
            
            <div>
              <Label htmlFor="daya">Daya</Label>
              <Input
                id="daya"
                value={formData.daya}
                onChange={(e) => handleChange('daya', e.target.value)}
                placeholder="e.g., 1300 VA"
              />
            </div>
            
            <div>
              <Label htmlFor="pekerjaan">Pekerjaan</Label>
              <Input
                id="pekerjaan"
                value={formData.pekerjaan}
                onChange={(e) => handleChange('pekerjaan', e.target.value)}
                placeholder="Enter job/profession"
              />
            </div>
            
            <div>
              <Label htmlFor="nomorKontrak">Nomor Kontrak</Label>
              <Input
                id="nomorKontrak"
                value={formData.nomorKontrak}
                onChange={(e) => handleChange('nomorKontrak', e.target.value)}
                placeholder="Enter contract number"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Information
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerModal;
