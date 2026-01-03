// CSS Pixel Perfect Police - Because 1px matters when you're paid by the hour
// Usage: Drop this in browser console, then click any element to arrest pixel criminals

(function() {
    'use strict';
    
    // The chief of pixel police
    const police = {
        isActive: false,
        originalStyles: new Map(),
        
        // Book 'em, Danno - highlight offending elements
        arrest: function(element) {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            
            // Check for common pixel crimes
            const crimes = [];
            
            // Crime 1: Non-integer dimensions (the most heinous offense)
            if (!Number.isInteger(rect.width)) crimes.push(`Width: ${rect.width}px (FRACTIONAL!)`);
            if (!Number.isInteger(rect.height)) crimes.push(`Height: ${rect.height}px (FRACTIONAL!)`);
            
            // Crime 2: Suspicious positioning
            if (!Number.isInteger(rect.top)) crimes.push(`Top: ${rect.top}px (FLOATING POINT SUSPECT)`);
            if (!Number.isInteger(rect.left)) crimes.push(`Left: ${rect.left}px (FLOATING POINT SUSPECT)`);
            
            // Crime 3: Blurry fonts (aka "the renderer did it")
            const fontSize = parseFloat(style.fontSize);
            if (fontSize && !Number.isInteger(fontSize)) crimes.push(`Font: ${fontSize}px (BLURRY TEXT ALERT)`);
            
            // Make the arrest with visual evidence
            if (crimes.length > 0) {
                this.originalStyles.set(element, element.style.cssText);
                element.style.outline = '3px solid #ff0000';
                element.style.outlineOffset = '2px';
                element.style.boxShadow = '0 0 0 2px #ffff00';
                element.title = `PIXEL CRIMES:\n${crimes.join('\n')}`;
                
                console.log(`🚨 PIXEL ARREST: ${element.tagName}`, crimes);
                console.log('Full evidence:', rect);
            }
        },
        
        // Release on good behavior (or when designer looks away)
        release: function(element) {
            if (this.originalStyles.has(element)) {
                element.style.cssText = this.originalStyles.get(element);
                this.originalStyles.delete(element);
            }
        },
        
        // Start the beat
        startPatrol: function() {
            if (this.isActive) return;
            
            document.addEventListener('click', this.handleClick.bind(this), true);
            console.log('👮 Pixel Police on patrol! Click elements to inspect.');
            console.log('Type pixelPolice.endPatrol() to go off duty.');
            this.isActive = true;
        },
        
        // End of shift
        endPatrol: function() {
            document.removeEventListener('click', this.handleClick.bind(this), true);
            
            // Release all detained elements
            this.originalStyles.forEach((style, element) => {
                element.style.cssText = style;
            });
            this.originalStyles.clear();
            
            console.log('🛌 Pixel Police off duty. The pixels are safe... for now.');
            this.isActive = false;
        },
        
        // Click handler - Miranda rights for pixels
        handleClick: function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            this.release(event.target);  // Release if previously arrested
            this.arrest(event.target);   // Book 'em!
        }
    };
    
    // Make the police available globally (for good cops and bad pixels)
    window.pixelPolice = police;
    
    // Auto-start the patrol (because crime never sleeps)
    police.startPatrol();
    
    console.log('🔫 CSS Pixel Perfect Police loaded. Ready to serve and protect... pixels.');
})();