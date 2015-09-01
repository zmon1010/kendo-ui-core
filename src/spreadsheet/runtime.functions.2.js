// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./runtime" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, validthis:true */

    var spreadsheet = kendo.spreadsheet;
    var calc = spreadsheet.calc;
    var runtime = calc.runtime;
    var defineFunction = runtime.defineFunction;
    var defineAlias = runtime.defineAlias;
    var CalcError = runtime.CalcError;
    var RangeRef = spreadsheet.RangeRef;
    var CellRef = spreadsheet.CellRef;
    var UnionRef = spreadsheet.UnionRef;
    var Matrix = runtime.Matrix;
    var Ref = spreadsheet.Ref;

    /* -----[ Spreadsheet API ]----- */

    defineFunction("ERF", function(ll, ul) {
        if (ul == null) {
            return ERF(ll);
        }
        return ERF(ul) - ERF(ll);
    }).args([
        [ "lower_limit", "number" ],
        [ "upper_limit", [ "or", "number", "null" ] ]
    ]);

    defineFunction("ERFC", ERFC).args([
        [ "x", "number" ]
    ]);

    defineFunction("GAMMALN", GAMMALN).args([
        [ "x", "number++" ]
    ]);

    defineFunction("GAMMA", GAMMA).args([
        [ "x", "number" ]
    ]);

    defineFunction("GAMMA.DIST", GAMMA_DIST).args([
        [ "x", "number+" ],
        [ "alpha", "number++" ],
        [ "beta", "number++" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("GAMMA.INV", GAMMA_INV).args([
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ],
        [ "alpha", "number++" ],
        [ "beta", "number++" ]
    ]);

    defineFunction("NORM.S.DIST", NORM_S_DIST).args([
        [ "z", "number" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("NORM.S.INV", NORM_S_INV).args([
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ]
    ]);

    defineFunction("NORM.DIST", NORM_DIST).args([
        [ "x", "number" ],
        [ "mean", "number" ],
        [ "stddev", "number++" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("NORM.INV", NORM_INV).args([
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ],
        [ "mean", "number" ],
        [ "stddev", "number++" ]
    ]);

    defineFunction("BETADIST", BETADIST).args([
        [ "x", "number" ],
        [ "alpha", "number++" ],
        [ "beta", "number++" ],
        [ "A", [ "or", "number", [ "null", 0 ] ] ],
        [ "B", [ "or", "number", [ "null", 1 ] ] ],
        [ "?", [ "and",
                 [ "assert", "$x >= $A", "NUM" ],
                 [ "assert", "$x <= $B", "NUM" ],
                 [ "assert", "$A < $B", "NUM" ] ] ]
    ]);

    defineFunction("BETA.DIST", BETA_DIST).args([
        [ "x", "number" ],
        [ "alpha", "number++" ],
        [ "beta", "number++" ],
        [ "cumulative", "logical" ],
        [ "A", [ "or", "number", [ "null", 0 ] ] ],
        [ "B", [ "or", "number", [ "null", 1 ] ] ],
        [ "?", [ "and",
                 [ "assert", "$x >= $A", "NUM" ],
                 [ "assert", "$x <= $B", "NUM" ],
                 [ "assert", "$A < $B", "NUM" ] ] ]
    ]);

    defineFunction("BETA.INV", BETA_INV).args([
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ],
        [ "alpha", "number++" ],
        [ "beta", "number++" ],
        [ "A", [ "or", "number", [ "null", 0 ] ] ],
        [ "B", [ "or", "number", [ "null", 1 ] ] ]
    ]);

    defineFunction("CHISQ.DIST", chisq_left).args([
        [ "x", "number+" ],
        [ "deg_freedom", "integer++" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("CHISQ.DIST.RT", chisq_right).args([
        [ "x", "number+" ],
        [ "deg_freedom", "integer++" ]
    ]);

    defineFunction("CHISQ.INV", chisq_left_inv).args([
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ],
        [ "deg_freedom", "integer++" ]
    ]);

    defineFunction("CHISQ.INV.RT", chisq_right_inv).args([
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ],
        [ "deg_freedom", "integer++" ]
    ]);

    defineFunction("CHISQ.TEST", function(ac, ex){
        return chisq_test(ac.data, ex.data);
    }).args([
        [ "actual_range", "matrix" ],
        [ "expected_range", "matrix" ],
        [ "?", [ "and",
                 [ "assert", "$actual_range.width == $expected_range.width" ],
                 [ "assert", "$actual_range.height == $expected_range.height" ] ] ]
    ]);

    /* -----[ definitions ]----- */

    var MAX_IT = 300,     // Maximum allowed number of iterations
        EPS = 2.2204e-16, // Relative accuracy; 1-3*(4/3-1) = 2.220446049250313e-16
        FP_MIN = 1.0e-30, // Near the smallest representable as floating-point, number.
        f_abs = Math.abs;

    function ERF(x) {
        if (f_abs(x) >= 3.3) {
            return 1 - ERFC(x);
        }
        var S = x > 0 ? 1 : -1;
        if (S == -1) {
            x = -x;
        }
        var m = 0, an = 1;
        for (var n = 1; n < 100; n++) {
            m += an;
            an *= 2*x*x/(2*n+1);
        }
        return S*2/Math.sqrt(Math.PI)*x*Math.exp(-x*x)*m;
    }

    function ERFC(x) {
        if (f_abs(x) < 3.3) {
            return 1 - ERF(x);
        }
        var s = 1;
        if (x < 0) {
            s = -1;
            x = -x;
        }
        var frac = x;
        for (var n = 8; n >= 1; n -= 0.5) {
            frac = x + n/frac;
        }
        frac = 1 / (x + frac);
        return s == 1
            ? Math.exp(-x*x)/Math.sqrt(Math.PI)*frac
            : 2 - Math.exp(-x*x)/Math.sqrt(Math.PI)*frac;
    }

    function GAMMALN(x) { // Returns the value ln[Γ(x)] for x > 0.
        var cof = [
            1.000000000190015, 76.18009172947146, -86.50532032941677,
            24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
        ];
        var y = x, tmp = x + 5.5, ser = cof[0];
        tmp -= (x + 0.5) * Math.log(tmp);
        for (var j = 1; j <= 6; j++) {
            y += 1;
            ser += cof[j] / y;
        }
        return -tmp + Math.log(Math.sqrt(2*Math.PI) * ser / x); // log(Γ(x)) = log(Γ(x+1)) - log(x)
    }

    function GAMMA(x) { // returns Infinity for 0 or negative _integer argument.
        if (x > 0) {
            return Math.exp(GAMMALN(x));
        }
        var pi = Math.PI, y = -x; // For x<0 we use the reflection formula: Γ(x)Γ(1-x) = PI / sin(PI*x)
        return -pi / (y*GAMMA(y)*Math.sin(pi*y));
    }

    function BETALN(a, b) {
        return GAMMALN(a) + GAMMALN(b) - GAMMALN(a+b);
    }

    function BETA(a, b) {
        return Math.exp(BETALN(a, b));
    }

    function gamma_inc(a, x) { // returns the normalized incomplete gamma function P(a, x); x > 0.
        return x < a+1.0 ? g_series(a, x) : 1 - g_contfrac(a, x);
    }

    function g_series(a, x) { // evaluate P(a, x) by its series representation (converges quickly for x < a+1).
        var sum = 1/a,
            frac = sum,
            ap = a;
        var gln = GAMMALN(a), n;
        for (n = 1; n <= MAX_IT; n++) {
            ap++;
            frac *= x/ap;
            sum += frac;
            if (f_abs(frac) < f_abs(sum)*EPS) {
                break; // already the last frac is too small versus the current sum value
            }
        }
        return sum * Math.exp(-x + a*Math.log(x) - gln); // e^{-x} * x^a * Γ(a) * sum
    }

    function g_contfrac(a, x) { // Q(a, x) by its continued fraction representation (converges quickly for x > a + 1); modified Lentz’s method (Numerical Recipes (The Art of Scientific Computing), 2rd Edition $5.2)
        var f = FP_MIN, c = f, d = 0, aj = 1, bj = x + 1 - a;
        var gln = GAMMALN(a);
        for (var i = 1; i <= MAX_IT; i++) {
            d = bj + aj * d;
	    if (f_abs(d) < FP_MIN) {
                d = FP_MIN;
            }
	    c = bj + aj / c;
	    if (f_abs(c) < FP_MIN) {
                c = FP_MIN;
            }
	    d = 1 / d;
	    var delta = c * d;
	    f *= delta;
    	    if (f_abs(delta - 1) < EPS) {
                break;
            }
	    bj += 2;
	    aj = -i * (i - a);
	}
	return f * Math.exp(-x - gln + a * Math.log(x));
    }

    function GAMMA_DIST(x, a, b, cumulative) { // a > 0, b > 0; x >= 0
        if (!cumulative) {
            return Math.pow(x/b, a-1)*Math.exp(-x/b)/(b*GAMMA(a)); // the PDF of the Gamma distribution
        }
        return gamma_inc(a, x/b); // (else) compute the CDF (using the incomplete Gamma function)
    }

    function GAMMA_INV(p, a, b) { // the quantile function of the Gamma distribution
	if (p === 0) {
            return 0;
        }
	if (p == 1) {
            return Infinity;
        }
	var m = 0, M = 10, x = 0, ab = a*b;
	if (ab > 1) {
            M *= ab;
        }
	for (var i = 0; i < MAX_IT; i++) {
	    x = 0.5*(m + M); // console.log(x);
	    var q = GAMMA_DIST(x, a, b, true);
	    if (f_abs(p - q) < 1e-16) {
                break;
            }
	    if (q > p) {
                M = x;
            } else {
                m = x;
            }
	}
	return x;
    }

    function NORM_S_DIST(x, cumulative) {
        if (!cumulative) {
            return Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
        }
        return 0.5 + 0.5*ERF(x/Math.sqrt(2));
    }

    function NORM_S_INV(p) { // see [1] $26.2.3 and http://home.online.no/~pjacklam/notes/invnorm/#References
        // Coefficients in rational approximations.
        var a = [-3.969683028665376e+01,  2.209460984245205e+02,
                 -2.759285104469687e+02,  1.383577518672690e+02,
                 -3.066479806614716e+01,  2.506628277459239e+00],
            b = [-5.447609879822406e+01,  1.615858368580409e+02,
                 -1.556989798598866e+02,  6.680131188771972e+01,
                 -1.328068155288572e+01],
            c = [-7.784894002430293e-03, -3.223964580411365e-01,
                 -2.400758277161838e+00, -2.549732539343734e+00,
                 4.374664141464968e+00,  2.938163982698783e+00],
            d = [ 7.784695709041462e-03,  3.224671290700398e-01,
                  2.445134137142996e+00,  3.754408661907416e+00];
        // Define break-points.
        var plow  = 0.02425,
            phigh = 1 - plow;
        var q, r;
        // Rational approximation for lower region:
        if (p < plow) {
            q = Math.sqrt(-2*Math.log(p));
            return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
        }
        // Rational approximation for upper region:
        if (phigh < p) {
            q = Math.sqrt(-2*Math.log(1-p));
            return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
        }
        // Rational approximation for central region:
        q = p - 0.5;
        r = q*q;
        return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q / (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
    }

    function NORM_DIST(x, m, s, cumulative) {
        if (!cumulative) {
            return Math.exp(-(x-m)*(x-m)/(2*s*s))/(s*Math.sqrt(2*Math.PI)); // NORM_S_DIST((x-m)/s)/s;
        }
        return NORM_S_DIST((x-m)/s, true);
    }

    function NORM_INV(p, m, s) {
        return m + s*NORM_S_INV(p);
    }

    function betastd_pdf(x, a, b) {
        return Math.exp((a-1)*Math.log(x) + (b-1)*Math.log(1-x) - BETALN(a, b));
    }

    function betastd_cdf(x, a, b) {
        var k = Math.exp(a*Math.log(x) + b*Math.log(1-x) - BETALN(a, b));
        return x < (a+1)/(a+b+2) ? k*beta_lentz(a, b, x)/a : 1 - k*beta_lentz(b, a, 1-x)/b;
    }

    function beta_lentz(a, b, x) { // estimates continued fraction by modified Lentz’s method ([2] $8.17.22)
        var m, m2;
        var aa, c, d, del, h, qab, qam, qap;
        qab = a + b; // These q’s will be used in factors that occur in the coefficients d_n
        qap = a + 1;
        qam = a - 1;
        c = 1; // First step of Lentz’s method.
        d = 1 - qab * x / qap;
        if (f_abs(d) < FP_MIN) {
            d = FP_MIN;
        }
        d = 1/d;
        h = d;
        for (m = 1; m <= MAX_IT; m++) {
            m2 = 2*m;
            aa = m*(b - m)*x / ((qam + m2)*(a + m2));
            d = 1 + aa*d; // One step (the even one) of the recurrence.
            if (f_abs(d) < FP_MIN) {
                d = FP_MIN;
            }
            c = 1 + aa/c;
            if (f_abs(c) < FP_MIN) {
                c = FP_MIN;
            }
            d = 1/d;
            h *= d*c;
            aa = -(a + m)*(qab + m)*x / ((a + m2)*(qap + m2));
            d = 1 + aa*d; // Next step of the recurrence (the odd one).
            if (f_abs(d) < FP_MIN) {
                d = FP_MIN;
            }
            c = 1 + aa/c;
            if (f_abs(c) < FP_MIN) {
                c = FP_MIN;
            }
            d = 1/d;
            del = d*c;
            h *= del;
            if (f_abs(del - 1) < EPS) {
                break;
            }
        }
        return h; // if(m > MAX_IT) throw new Error("a or b too big, or MAX_IT too small");
    }

    function betastd_inv(p, a, b) { // the quantile function of the standard Beta distribution
	var m = 0, M = 1, x = 0;
	for (var i = 0; i < MAX_IT; i++) {
	    x = 0.5*(m + M);
	    var q = betastd_cdf(x, a, b);
	    if (f_abs(p - q) < EPS) {
                break;
            }
	    if (q > p) {
                M = x;
            } else {
                m = x;
            }
	}
	return x;
    }

    function BETADIST(x, a, b, m, M) {
        return betastd_cdf((x-m)/(M-m), a, b);
    }

    function BETA_DIST(x, a, b, cdf, m, M) {
        if (cdf) {
            return betastd_cdf((x-m)/(M-m), a, b);
        }
        return betastd_pdf((x-m)/(M-m), a, b) / (M-m);
    }

    function BETA_INV(p, a, b, m, M) {
        return m + (M-m)*betastd_inv(p, a, b);
    }

    function chisq_left(x, n, cds) {  // CHISQ.DIST(x,deg_freedom,cumulative)
        return GAMMA_DIST(x, n/2, 2, cds);
    }

    function chisq_right(x, n) { // CHISQ.DIST.RT(x,deg_freedom)
        return 1 - chisq_left(x, n, true);
    }

    function chisq_left_inv(p, n) { // CHISQ.INV( probability, degrees_freedom )
        return GAMMA_INV(p, n/2, 2);
    }

    function chisq_right_inv(p, n) { // CHISQ.INV.RT(probability,deg_freedom)
        return chisq_left_inv(1-p, n);
    }

    function chisq_test(obsv, expect) {
        var rows = obsv.length, cols = obsv[0].length;
        var x = 0, i, j;
        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                var eij = expect[i][j];
                var delta = obsv[i][j] - eij;
                delta *= delta;
                x += delta/eij;
            }
        }
        var n = (rows - 1)*(cols - 1);
        return chisq_right(x, n);
    }

    /*
      [1] Handbook of Mathematical Functions (NIST, 1964-2010):
      https://en.wikipedia.org/wiki/Abramowitz_and_Stegun
      http://dlmf.nist.gov/
      http://www.aip.de/groups/soe/local/numres/

      [2] https://en.wikibooks.org/wiki/Statistics/Numerical_Methods/Numerics_in_Excel
    */

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
