// Lightweight Web Audio API synthesizer for tactile Apple-style sound effects
// Does not load any external audio files, works with 0kb bandwidth overhead.

class SoundManager {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
    }

    init() {
        if (!this.ctx && typeof window !== "undefined") {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (!this.isMuted) {
            this.playClick();
        }
        return this.isMuted;
    }

    playClick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === "suspended") this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }

    playSwitch() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === "suspended") this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
    }

    playShutter() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === "suspended") this.ctx.resume();

        // Shutter click part 1
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = "square";
        osc1.frequency.setValueAtTime(1200, this.ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.03);

        gain1.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);

        osc1.start();
        osc1.stop(this.ctx.currentTime + 0.03);

        // Shutter release part 2
        setTimeout(() => {
            if (!this.ctx) return;
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc2.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.04);

            gain2.gain.setValueAtTime(0.07, this.ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

            osc2.connect(gain2);
            gain2.connect(this.ctx.destination);

            osc2.start();
            osc2.stop(this.ctx.currentTime + 0.04);
        }, 60);
    }

    playHapticAction() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === "suspended") this.ctx.resume();

        // Double pulse haptic sound
        [0, 0.08].forEach((delay, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "sine";
            const freq = idx === 0 ? 220 : 330;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
            osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + delay + 0.05);

            gain.gain.setValueAtTime(0.12, this.ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + delay);
            osc.stop(this.ctx.currentTime + delay + 0.05);
        });
    }
}

export const sounds = new SoundManager();
