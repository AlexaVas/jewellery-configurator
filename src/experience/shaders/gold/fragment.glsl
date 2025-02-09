
// Fragment Shader
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3 uColor;
float random(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}
void main() {
   
    //  // Control the speed of the animation
    float progress = clamp(uTime *0.3, 0.0, 1.0);
    
    // Normalize vPosition.y to the range [0,1]
    float minY = -1.0; // Adjust based on your model
    float maxY = 1.0;
    float mask = (vPosition.y - minY) / (maxY - minY);
    
    // Add noise for variation
    float noise = random(vUv * 10.0) * 0.1;
    
    // Smooth transition width
    float transitionWidth = 0.2;

    // Ensure the effect moves from bottom to top
    float transparency = smoothstep( progress + transitionWidth + noise, progress, mask);


    
    // Set the final color
    csm_DiffuseColor = vec4(uColor, transparency);


}