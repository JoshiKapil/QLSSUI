import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  successToastr(message: string, title = 'Success'): void {
    this.showToastr(message, title, '#1f7a4d');
  }

  warningToastr(message: string, title = 'Warning'): void {
    this.showToastr(message, title, '#323232');
  }

  private showToastr(message: string, title: string, background: string): void {
    const toast = document.createElement('div');
    toast.innerHTML = `<strong>${title}</strong><div>${message}</div>`;
    Object.assign(toast.style, {
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      zIndex: '99999',
      background,
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      maxWidth: '320px',
      lineHeight: '1.4',
      opacity: '1',
      transition: 'opacity 0.3s ease'
    });

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}
