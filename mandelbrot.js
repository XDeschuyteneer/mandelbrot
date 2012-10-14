function iter(cx, cy, maxiter)
{
    var i;
    var x = 0.0;
    var y = 0.0;
    //si le module > 2, suite diverge vers infinity, donc c not in {mandelbrot}
    for (i = 0; i < maxiter && x * x + y * y <= 4; i++)
    {
        var tmp = 2*x*y;
        x = x*x - y*y + cx;
        y = tmp + cy;
    }
    return i;
}
 
function Mandelbrot()
{
    cd = document.getElementById('calcdata');
    xmin = parseFloat(cd.xmin.value);
    xmax = parseFloat(cd.xmax.value);
    ymin = parseFloat(cd.ymin.value);
    ymax = parseFloat(cd.ymax.value);
    iterations = parseInt(cd.iterations.value);
    canvas = document.getElementById('mandelimage');
    width = canvas.width;
    height = canvas.height;
    ctx = canvas.getContext("2d");
    img = ctx.getImageData(0, 0, width, height);
    //parcours de tous les pixels de l'image
    for (ix = 0; ix < width; ix++) {
        for (iy = 0; iy < height; iy++) {
            //normalisation
            x = xmin + (xmax - xmin) * ix / (width - 1);
            y = ymin + (ymax - ymin) * iy / (height - 1);
            
            i = iter(x, y, iterations);
            //on suppose que comme i est grd
            //ce point n'est pas dans l'ensemble => noir
            if (i == iterations)
                setPixel(img, ix, iy, 0, 0, 0, 255);
            else {
                //segmentation des solutions pour le choix des couleurs
                c = 3 * Math.log(i) / Math.log(iterations);
                
                if (c < 1)
                //[noir;rouge]
                    setPixel(img, ix, iy, 255 * c, 0, 0, 255);
                else if (c < 2)
                //[rouge;jaune]
                    setPixel(img, ix, iy, 255, 255 * (c - 1), 0, 255);
                else
                //[jaune;blanc]
                    setPixel(img, ix, iy, 255, 255, 255 * (c - 2), 255);
            }
        }
    }
    ctx.putImageData(img,0,0);
}

//mise à jour du pixel de img en position (x,y) avec la valeur rgba(r,g,b,a)
function setPixel(img, x, y, r, g, b, a) {
    //calcul de l'index dans l'array de bytes de l'img
    index = (x + y * img.width) * 4;
    img.data[index+0] = r;
    img.data[index+1] = g;
    img.data[index+2] = b;
    img.data[index+3] = a;
}