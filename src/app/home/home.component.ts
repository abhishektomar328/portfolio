import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ReactiveFormsModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isSidebarOpen = false;
  isMobile = false;

  animatedText: string = '';

  private part1: string = `Hey there! I'm Abhishek Tomar`;
  private part2: string = ` a passionate full-stack MEAN developer`;
  private part3: string = ` Working at VSkout Data Services, Gurugram, Haryana, India.`;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }
  ngOnInit() {
    this.animateLoop();
    this.onResize();
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
  }
  handleLinkClick(sectionId: string) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if (this.isMobile) {
      this.closeSidebar();
    }
  }
  
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // optional: reveal only once
        }
      })
    }, {
      threshold: 0.1
    });
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
  }

  dots = Array.from({ length: 30 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    color: this.randomColor(),
    delay: `${Math.random() * 5}s`,
    duration: `${6 + Math.random() * 4}s`
  }));
  
  randomColor() {
  const colors = ['#ff4b2b', '#00f260', '#ffb400', '#2196f3', '#e91e63', '#9c27b0', '#00bcd4', '#4caf50'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// async typeText(text: string, delay: number = 50): Promise<void> {
//   let i = 0;
//   return new Promise<void>((resolve) => {
//     const interval = setInterval(() => {
//       this.animatedText = text.slice(0, i + 1);
//       i++;
//       if (i >= text.length) {
//         clearInterval(interval);
//         resolve();
//       }
//     }, delay);
//   });
// }

// async animateLoop(): Promise<void> {
//   while (true) {
//     await this.typeText(this.part1);
//     await this.delay(500);
//     await this.typeText(this.part1 + this.part2);
//     await this.delay(500);
//     await this.typeText(this.part1 + this.part2 + this.part3);
//     await this.delay(2000);
//     this.animatedText = '';
//     await this.delay(800);
//   }
// }

// delay(ms: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }


private delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

private async typeText(text: string, delayMs = 50): Promise<void> {
  let result = '';
  let tagBuffer = '';
  let insideTag = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '<') {
      insideTag = true;
    }

    if (insideTag) {
      tagBuffer += char;
      if (char === '>') {
        result += tagBuffer;
        tagBuffer = '';
        insideTag = false;
      }
    } else {
      result += `<span class="fade-letter">${char}</span>`;
      this.animatedText = result;
      await this.delay(delayMs);
    }
  }
}

private async animateLoop(): Promise<void> {
  const parts = [this.part1, this.part2, this.part3];

  while (true) {
    for (const part of parts) {
      this.animatedText = '';
      await this.typeText(part);
      await this.delay(1500);
    }
  }
}



  
}
