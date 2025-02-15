function openModal(brandId, brandName, brandLogo) {
    document.getElementById('brand').value = brandId;
    document.getElementById('modalBrandName').textContent = brandName;
    document.getElementById('modalBrandLogo').src = brandLogo;
    document.getElementById('receiptModal').style.display = 'block';
    
    // Reset form
    document.getElementById('receipt-form').reset();
    document.getElementById('date').valueAsDate = new Date();
}

function closeModal() {
    document.getElementById('receiptModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('receiptModal');
    if (event.target === modal) {
        closeModal();
    }
}

async function generateReceipt() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    const brand = document.getElementById('brand').value;
    const userData = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        total: document.getElementById('total').value
    };

    try {
        const response = await fetch('/generate-receipt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brand, user_data: userData })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${brand}_receipt.docx`;
            link.click();
            window.URL.revokeObjectURL(url);
            closeModal();
        } else {
            throw new Error('Failed to generate receipt');
        }
    } catch (error) {
        alert('Error generating receipt: ' + error.message);
    } finally {
        loading.style.display = 'none';
    }
}