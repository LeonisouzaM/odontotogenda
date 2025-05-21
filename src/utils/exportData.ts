
/**
 * Utility function to export data as CSV
 */
export function exportToCSV(data: any[], fileName: string): void {
  // Convert the data to CSV format
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(item => 
    Object.values(item)
      .map(value => {
        // Handle string values that might contain commas
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(',')
  );
  
  const csv = [header, ...rows].join('\n');
  
  // Create a blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
