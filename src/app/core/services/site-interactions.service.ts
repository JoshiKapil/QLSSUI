import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SiteInteractionsService {
  private renderer: Renderer2;
  private cleanup: Array<() => void> = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    private zone: NgZone,
    router: Router
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => this.initPage(), 0);
    });
  }

  initPage(): void {
    this.cleanup.forEach((fn) => fn());
    this.cleanup = [];
    this.zone.runOutsideAngular(() => {
      this.initReveal();
      this.initCounters();
      this.initHeroCarousel();
      this.initReviewsCarousel();
      this.initFaq();
      this.initClientFilters();
      this.initTabs();
      this.initContactUpload();
      this.initWhatsApp();
      this.initLogoReveal();
    });
  }

  private listen(target: EventTarget, event: string, handler: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): void {
    target.addEventListener(event, handler, options);
    this.cleanup.push(() => target.removeEventListener(event, handler, options));
  }

  private initReveal(): void {
    const els = Array.from(this.document.querySelectorAll('.reveal, .svc-card'));
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('active', 'in-view', 'visible');
        observer.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach((el) => observer.observe(el));
    this.cleanup.push(() => observer.disconnect());
  }

  private initCounters(): void {
    const counters = Array.from(this.document.querySelectorAll<HTMLElement>('.counter'));
    if (!counters.length) return;
    const animate = (el: HTMLElement) => {
      const target = parseInt(el.dataset['target'] || '0', 10);
      const step = target / (1800 / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
      }, 16);
      this.cleanup.push(() => clearInterval(timer));
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => observer.observe(el));
    this.cleanup.push(() => observer.disconnect());
  }

  private initHeroCarousel(): void {
    const slides = Array.from(this.document.querySelectorAll<HTMLElement>('.hero-slide'));
    if (!slides.length) return;
    const dots = Array.from(this.document.querySelectorAll<HTMLElement>('.hero-dot'));
    const prev = this.document.getElementById('heroPrev');
    const next = this.document.getElementById('heroNext');
    const carousel = this.document.getElementById('heroCarousel');
    let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
    let timer: ReturnType<typeof setInterval> | undefined;
    let touchStartX = 0;

    const triggerText = (slide: HTMLElement) => {
      slide.classList.remove('is-animating');
      void slide.offsetWidth;
      slide.classList.add('is-animating');
    };
    const goTo = (index: number) => {
      index = ((index % slides.length) + slides.length) % slides.length;
      slides[current]?.classList.remove('active', 'is-animating');
      dots[current]?.classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
      setTimeout(() => triggerText(slides[current]), 50);
    };
    const stop = () => { if (timer) clearInterval(timer); };
    const start = () => { stop(); timer = setInterval(() => goTo(current + 1), 5000); };
    const reset = () => { stop(); start(); };

    triggerText(slides[current]);
    if (prev) this.listen(prev, 'click', () => { goTo(current - 1); reset(); });
    if (next) this.listen(next, 'click', () => { goTo(current + 1); reset(); });
    dots.forEach((dot, index) => this.listen(dot, 'click', () => { goTo(index); reset(); }));
    if (carousel) {
      this.listen(carousel, 'mouseenter', stop);
      this.listen(carousel, 'mouseleave', start);
      this.listen(carousel, 'touchstart', ((event: TouchEvent) => { touchStartX = event.touches[0].clientX; }) as EventListener, { passive: true });
      this.listen(carousel, 'touchend', ((event: TouchEvent) => {
        const diff = touchStartX - event.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          goTo(current + (diff > 0 ? 1 : -1));
          reset();
        }
      }) as EventListener, { passive: true });
    }
    start();
    this.cleanup.push(stop);
  }

  private initReviewsCarousel(): void {
    const track = this.document.getElementById('reviewsCarousel');
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.lp-review-card'));
    if (!cards.length) return;
    const prev = this.document.getElementById('rcPrev');
    const next = this.document.getElementById('rcNext');
    let current = 0;
    const scrollToCard = (index: number) => {
      current = Math.max(0, Math.min(index, cards.length - 1));
      const cardRect = cards[current].getBoundingClientRect();
      const containerRect = track.getBoundingClientRect();
      track.scrollBy({ left: cardRect.left - containerRect.left, behavior: 'smooth' });
    };
    if (prev) this.listen(prev, 'click', () => scrollToCard(current - 1));
    if (next) this.listen(next, 'click', () => scrollToCard(current + 1));
  }

  private initFaq(): void {
    this.document.querySelectorAll<HTMLElement>('.faq-question, .faq-q').forEach((button) => {
      this.listen(button, 'click', () => {
        const item = button.closest('.faq-item');
        const answer = (button.nextElementSibling || item?.querySelector('.faq-a')) as HTMLElement | null;
        const inner = item?.querySelector<HTMLElement>('.faq-a__inner');
        const isOpen = button.classList.contains('open') || button.getAttribute('aria-expanded') === 'true' || item?.classList.contains('open');
        this.document.querySelectorAll<HTMLElement>('.faq-item.open').forEach((openItem) => {
          openItem.classList.remove('open');
          openItem.querySelector<HTMLElement>('.faq-q')?.setAttribute('aria-expanded', 'false');
          const openAnswer = openItem.querySelector<HTMLElement>('.faq-a');
          if (openAnswer) openAnswer.style.maxHeight = '0';
        });
        this.document.querySelectorAll<HTMLElement>('.faq-question.open').forEach((openBtn) => {
          openBtn.classList.remove('open');
          const openAnswer = openBtn.nextElementSibling as HTMLElement | null;
          if (openAnswer) {
            openAnswer.classList.remove('open');
            openAnswer.style.maxHeight = '0';
          }
        });
        if (!isOpen && answer) {
          button.classList.add('open');
          button.setAttribute('aria-expanded', 'true');
          item?.classList.add('open');
          answer.classList.add('open');
          answer.style.maxHeight = `${(inner || answer).scrollHeight}px`;
        }
      });
    });
  }

  private initClientFilters(): void {
    const grid = this.document.getElementById('clientsGrid');
    const logos = Array.from(this.document.querySelectorAll<HTMLElement>('.clientslogo'));
    if (grid && logos.length) {
      const reveal = () => {
        if (grid.getBoundingClientRect().top < window.innerHeight - 60) {
          logos.filter((el) => !el.classList.contains('hidden')).forEach((el, index) => setTimeout(() => el.classList.add('visible'), index * 30));
        }
      };
      this.listen(window, 'scroll', reveal, { passive: true });
      reveal();
    }
    this.document.querySelectorAll<HTMLElement>('.filter-btn').forEach((button) => {
      this.listen(button, 'click', () => {
        const filter = button.dataset['filter'] || 'all';
        this.document.querySelectorAll<HTMLElement>('.filter-btn').forEach((btn) => btn.classList.toggle('active', btn === button));
        logos.forEach((logo) => {
          const show = filter === 'all' || logo.dataset['category'] === filter;
          logo.classList.toggle('hidden', !show);
          logo.classList.toggle('visible', show);
        });
      });
    });
  }

  private initTabs(): void {
    this.document.querySelectorAll<HTMLElement>('.ctabs__btn').forEach((button) => {
      this.listen(button, 'click', () => {
        const tabs = button.closest('.ctabs');
        const tab = button.dataset['tab'];
        if (!tabs || !tab) return;
        tabs.querySelectorAll<HTMLElement>('.ctabs__btn').forEach((btn) => btn.classList.toggle('active', btn === button));
        tabs.querySelectorAll<HTMLElement>('.ctabs__panel').forEach((panel) => panel.classList.toggle('active', panel.dataset['panel'] === tab));
      });
    });
  }

  private initContactUpload(): void {
    const zone = this.document.getElementById('uploadZone');
    const input = this.document.getElementById('fileInput') as HTMLInputElement | null;
    const hint = this.document.getElementById('uploadHint');
    if (!zone || !input || !hint) return;
    const setName = () => {
      hint.textContent = input.files?.length ? input.files[0].name : 'PDF, DOC, DOCX up to 10MB';
    };
    ['dragenter', 'dragover'].forEach((eventName) => this.listen(zone, eventName, (event) => {
      event.preventDefault();
      zone.classList.add('dragging');
    }));
    ['dragleave', 'drop'].forEach((eventName) => this.listen(zone, eventName, (event) => {
      event.preventDefault();
      zone.classList.remove('dragging');
    }));
    this.listen(zone, 'drop', ((event: DragEvent) => {
      if (event.dataTransfer?.files.length) {
        input.files = event.dataTransfer.files;
        setName();
      }
    }) as EventListener);
    this.listen(input, 'change', setName);
  }

  private initLogoReveal(): void {
    const logoReveal = this.document.getElementById('logoReveal');
    if (!logoReveal) return;
    const start = Date.now();
    this.document.body.style.overflow = 'hidden';
    const dismiss = () => {
      const remaining = Math.max(0, 2400 - (Date.now() - start));
      const timer = setTimeout(() => {
        logoReveal.classList.add('logo-reveal--exiting');
        const done = () => {
          logoReveal.classList.add('logo-reveal--done');
          this.document.body.style.overflow = '';
        };
        this.listen(logoReveal, 'animationend', done, { once: true });
        setTimeout(done, 1200);
      }, remaining);
      this.cleanup.push(() => clearTimeout(timer));
    };
    dismiss();
  }

  private initWhatsApp(): void {
    if (this.document.getElementById('wa-float')) return;

    if (!this.document.getElementById('wa-float-css')) {
      const style = this.renderer.createElement('style');
      this.renderer.setAttribute(style, 'id', 'wa-float-css');
      style.textContent = `
@keyframes wa-pop-in {
  0%   { opacity: 0; transform: scale(0.4) translateY(20px); }
  70%  { opacity: 1; transform: scale(1.1) translateY(-3px); }
  100% { opacity: 1; transform: scale(1)   translateY(0);    }
}
@keyframes wa-pulse {
  0%   { box-shadow: 0 0 0 0   rgba(37,211,102,.6); }
  70%  { box-shadow: 0 0 0 16px rgba(37,211,102,0); }
  100% { box-shadow: 0 0 0 0   rgba(37,211,102,0); }
}
#wa-float {
  position: fixed !important;
  bottom:   28px  !important;
  right:    28px  !important;
  z-index:  99999 !important;
  display:  flex  !important;
  align-items: center !important;
  gap: 10px !important;
  pointer-events: auto !important;
  direction: ltr !important;
  opacity: 0;
  font-family: 'Poppins', sans-serif !important;
}
#wa-float.wa-show {
  animation: wa-pop-in 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.9s forwards;
}
#wa-float .wa-btn {
  display: flex           !important;
  align-items: center     !important;
  justify-content: center !important;
  width:  58px   !important;
  height: 58px   !important;
  border-radius: 50%  !important;
  background: #25d366 !important;
  box-shadow: 0 6px 22px rgba(37,211,102,.45) !important;
  cursor: pointer        !important;
  text-decoration: none  !important;
  flex-shrink: 0         !important;
  border: none           !important;
  outline: none          !important;
  animation: wa-pulse 2.2s ease-out 2s infinite;
  transition: transform 0.22s ease, background 0.22s ease !important;
}
#wa-float .wa-btn:hover {
  background: #1ebe5d !important;
  transform: scale(1.1) !important;
  box-shadow: 0 10px 30px rgba(37,211,102,.65) !important;
  animation: none !important;
}
#wa-float .wa-btn svg {
  display: block   !important;
  width:  30px     !important;
  height: 30px     !important;
  max-width: none  !important;
  transition: none !important;
  transform: none  !important;
  flex-shrink: 0   !important;
}
#wa-float .wa-tip {
  background: #fff        !important;
  color: #1a1a1a          !important;
  font-family: 'Poppins', sans-serif !important;
  font-size: 0.78rem      !important;
  font-weight: 600        !important;
  padding: 8px 14px       !important;
  border-radius: 20px     !important;
  box-shadow: 0 4px 18px rgba(0,0,0,.14) !important;
  white-space: nowrap     !important;
  pointer-events: none    !important;
  opacity: 0              !important;
  transition: opacity 0.2s ease !important;
  letter-spacing: 0.01em  !important;
  display: block          !important;
}
#wa-float.wa-show:hover .wa-tip {
  opacity: 1 !important;
}
@media (max-width: 576px) {
  #wa-float { bottom: 16px !important; right: 16px !important; }
  #wa-float .wa-btn { width: 52px !important; height: 52px !important; }
  #wa-float .wa-btn svg { width: 26px !important; height: 26px !important; }
  #wa-float .wa-tip { display: none !important; }
}
`;
      this.renderer.appendChild(this.document.head, style);
    }

    const wrap = this.renderer.createElement('div');
    this.renderer.setAttribute(wrap, 'id', 'wa-float');
    this.renderer.setAttribute(wrap, 'aria-label', 'Chat on WhatsApp');
    const tip = this.renderer.createElement('span');
    this.renderer.addClass(tip, 'wa-tip');
    tip.textContent = 'Chat with us on WhatsApp';
    const link = this.renderer.createElement('a');
    const waUrl = 'https://api.whatsapp.com/send?phone=917058954942&text=&app_absent=0';
    this.renderer.setAttribute(link, 'href', waUrl);
    this.renderer.setAttribute(link, 'target', '_blank');
    this.renderer.setAttribute(link, 'rel', 'noopener noreferrer');
    this.renderer.setAttribute(link, 'aria-label', 'Chat with QLSS on WhatsApp');
    this.renderer.addClass(link, 'wa-btn');
    link.innerHTML = '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#25D366"/><path fill="#fff" d="M22.6 9.4A9.5 9.5 0 0 0 7.3 20.9L6 26l5.3-1.4a9.5 9.5 0 0 0 4.7 1.2 9.5 9.5 0 0 0 9.5-9.5 9.5 9.5 0 0 0-2.9-6.9zm-6.6 14.6a7.9 7.9 0 0 1-4-1.1l-.3-.2-3.1.8.8-3-.2-.3a7.9 7.9 0 0 1-1.2-4.2 7.9 7.9 0 0 1 7.9-7.9 7.9 7.9 0 0 1 7.9 7.9 7.9 7.9 0 0 1-7.8 8zm4.3-5.9c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3a2.8 2.8 0 0 0-.9 2.1 5 5 0 0 0 1 2.6 11.4 11.4 0 0 0 4.3 3.8c.6.3 1.1.4 1.4.5.6.2 1.1.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.2-.3-.2-.6-.3z"/></svg>';
    this.renderer.appendChild(wrap, tip);
    this.renderer.appendChild(wrap, link);
    this.renderer.appendChild(this.document.body, wrap);
    requestAnimationFrame(() => requestAnimationFrame(() => wrap.classList.add('wa-show')));
  }
}