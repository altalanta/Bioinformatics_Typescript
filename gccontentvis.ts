// Assume Chart.js is included via CDN in your HTML file
declare var Chart: any;

class DNAAnalyzer {
    private sequence: string;

    constructor(sequence: string) {
        this.sequence = sequence.toUpperCase();
    }

    calculateGCContent(): number {
        const gcCount = (this.sequence.match(/[GC]/g) || []).length;
        return (gcCount / this.sequence.length) * 100;
    }

    complementSequence(): string {
        const complementMap: { [key: string]: string } = {
            'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'
        };
        return this.sequence
            .split('')
            .map(base => complementMap[base] || base)
            .join('');
    }

    baseComposition(): { [key: string]: number } {
        return {
            A: (this.sequence.match(/A/g) || []).length,
            T: (this.sequence.match(/T/g) || []).length,
            C: (this.sequence.match(/C/g) || []).length,
            G: (this.sequence.match(/G/g) || []).length
        };
    }

    visualizeBaseComposition(canvasId: string): void {
        const composition = this.baseComposition();
        const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(composition),
                datasets: [{
                    label: 'Base Composition',
                    data: Object.values(composition),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Usage
const dna = new DNAAnalyzer("ATCGCGTATACGCGCGATATATCGCGTA");
console.log(`GC Content: ${dna.calculateGCContent().toFixed(2)}%`);
console.log(`Complement: ${dna.complementSequence()}`);

// Visualize the base composition
dna.visualizeBaseComposition('baseCompositionChart');