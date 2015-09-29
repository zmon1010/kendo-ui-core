// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./runtime" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, validthis:true */
    /* jshint latedef: nofunc */

    var spreadsheet = kendo.spreadsheet;
    var calc = spreadsheet.calc;
    var runtime = calc.runtime;
    var defineFunction = runtime.defineFunction;
    var CalcError = runtime.CalcError;
    var Matrix = runtime.Matrix;

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

    defineFunction("EXPON.DIST", expon).args([
        [ "x", "number+" ],
        [ "lambda", "number++" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("POISSON.DIST", poisson).args([
        [ "x", "integer+" ],
        [ "mean", "number+" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("F.DIST", Fdist).args([
        [ "x", "number+" ],
        [ "deg_freedom1", "integer++" ],
        [ "deg_freedom2", "integer++" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("F.DIST.RT", Fdist_right).args([
        [ "x", "number+" ],
        [ "deg_freedom1", "integer++" ],
        [ "deg_freedom2", "integer++" ]
    ]);

    defineFunction("F.INV", Finv).args([
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ],
        [ "deg_freedom1", "integer++" ],
        [ "deg_freedom2", "integer++" ]
    ]);

    defineFunction("F.INV.RT", Finv_right).args([
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ],
        [ "deg_freedom1", "integer++" ],
        [ "deg_freedom2", "integer++" ]
    ]);

    defineFunction("F.TEST", Ftest).args([
        [ "array1", [ "collect", "number", 1 ] ],
        [ "array2", [ "collect", "number", 1 ] ],
        [ "?", [ "and",
                 [ "assert", "$array1.length >= 2", "DIV/0" ],
                 [ "assert", "$array2.length >= 2", "DIV/0" ] ] ]
    ]);

    defineFunction("FISHER", fisher).args([
        [ "x", [ "and", "number", [ "(between)", -1, 1 ] ] ]
    ]);

    defineFunction("FISHERINV", fisherinv).args([
        [ "y", "number" ]
    ]);

    defineFunction("T.DIST", Tdist).args([
        [ "x", "number" ],
        [ "deg_freedom", "integer++" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("T.DIST.RT", Tdist_right).args([
        [ "x", "number" ],
        [ "deg_freedom", "integer++" ]
    ]);

    defineFunction("T.DIST.2T", Tdist_2tail).args([
        [ "x", "number+" ],
        [ "deg_freedom", "integer++" ]
    ]);

    defineFunction("T.INV", Tdist_inv).args([
        [ "p", [ "and", "number", [ "(between]", 0, 1 ] ] ],
        [ "deg_freedom", "integer++" ]
    ]);

    defineFunction("T.INV.2T", Tdist_2tail_inv).args([
        [ "p", [ "and", "number", [ "(between]", 0, 1 ] ] ],
        [ "deg_freedom", "integer++" ]
    ]);

    defineFunction("T.TEST", Tdist_test).args([
        [ "array1", [ "collect", "number", 1 ] ],
        [ "array2", [ "collect", "number", 1 ] ],
        [ "tails", [ "and", "integer", [ "values", 1, 2 ] ] ],
        [ "type", [ "and", "integer", [ "values", 1, 2, 3 ] ] ],
        [ "?", [ "and",
                 [ "assert", "$type != 1 || $array1.length == $array2.length", "N/A" ],
                 [ "assert", "$array1.length >= 2", "DIV/0" ],
                 [ "assert", "$array2.length >= 2", "DIV/0" ] ] ]
    ]);

    defineFunction("CONFIDENCE.T", confidence_t).args([
        [ "alpha", [ "and", "number", [ "(between)", 0, 1 ] ] ],
        [ "standard_dev", "number++" ],
        [ "size", [ "and", "integer++",
                    [ "assert", "$size != 1", "DIV/0" ] ] ]
    ]);

    defineFunction("CONFIDENCE.NORM", confidence_norm).args([
        [ "alpha", [ "and", "number", [ "(between)", 0, 1 ] ] ],
        [ "standard_dev", "number++" ],
        [ "size", [ "and", "integer++" ] ]
    ]);

    defineFunction("GAUSS", gauss).args([
        [ "z", "number" ]
    ]);

    defineFunction("PHI", phi).args([
        [ "x", "number" ]
    ]);

    defineFunction("LOGNORM.DIST", lognorm_dist).args([
        [ "x", "number++" ],
        [ "mean", "number" ],
        [ "standard_dev", "number++" ],
        [ "cumulative", "logical" ]
    ]);

    defineFunction("LOGNORM.INV", lognorm_inv).args([
        [ "probability", [ "and", "number", [ "(between)", 0, 1 ] ] ],
        [ "mean", "number" ],
        [ "standard_dev", "number++" ]
    ]);

    defineFunction("PROB", prob).args([
        [ "x_range", [ "collect", "number", 1 ] ],
        [ "prob_range", [ "collect", "number", 1 ] ],
        [ "lower_limit", "number" ],
        [ "upper_limit", [ "or", "number", [ "null", "$lower_limit" ] ] ],
        [ "?", [ "and",
                 [ "assert", "$prob_range.length == $x_range.length", "N/A" ] ] ]
    ]);

    defineFunction("SLOPE", slope).args([
        [ "known_y", [ "collect", "number", 1 ] ],
        [ "known_x", [ "collect", "number", 1 ] ],
        [ "?", [ "and",
                 [ "assert", "$known_x.length == $known_y.length", "N/A" ],
                 [ "assert", "$known_x.length > 0 && $known_y.length > 0", "N/A" ] ] ]
    ]);

    defineFunction("INTERCEPT", intercept).args([
        [ "known_y", [ "collect", "number", 1 ] ],
        [ "known_x", [ "collect", "number", 1 ] ],
        [ "?", [ "and",
                 [ "assert", "$known_x.length == $known_y.length", "N/A" ],
                 [ "assert", "$known_x.length > 0 && $known_y.length > 0", "N/A" ] ] ]
    ]);

    defineFunction("PEARSON", pearson).args([
        [ "array1", [ "collect", "number", 1 ] ],
        [ "array2", [ "collect", "number", 1 ] ],
        [ "?", [ "and",
                 [ "assert", "$array2.length == $array1.length", "N/A" ],
                 [ "assert", "$array2.length > 0 && $array1.length > 0", "N/A" ] ] ]
    ]);

    defineFunction("RSQ", rsq).args([
        [ "known_y", [ "collect", "number", 1 ] ],
        [ "known_x", [ "collect", "number", 1 ] ],
        [ "?", [ "and",
                 [ "assert", "$known_x.length == $known_y.length", "N/A" ],
                 [ "assert", "$known_x.length > 0 && $known_y.length > 0", "N/A" ],
                 [ "assert", "$known_x.length != 1 && $known_y.length != 1", "N/A" ] ] ]
    ]);

    defineFunction("STEYX", steyx).args([
        [ "known_y", [ "collect", "number", 1 ] ],
        [ "known_x", [ "collect", "number", 1 ] ],
        [ "?", [ "and",
                 [ "assert", "$known_x.length == $known_y.length", "N/A" ],
                 [ "assert", "$known_x.length >= 3 && $known_y.length >= 3", "DIV/0" ] ] ]
    ]);

    defineFunction("FORECAST", forecast).args([
        [ "x", "number" ],
        [ "known_y", [ "collect", "number", 1 ] ],
        [ "known_x", [ "collect", "number", 1 ] ],
        [ "?", [ "and",
                 [ "assert", "$known_x.length == $known_y.length", "N/A" ],
                 [ "assert", "$known_x.length > 0 && $known_y.length > 0", "N/A" ] ] ]
    ]);

    defineFunction("LINEST", linest).args([
        [ "known_y", [ "collect", "number", 1 ] ],
        [ "known_x", [ "collect", "number", 1 ] ],
        [ "const", [ "or", "logical", [ "null", true ] ] ],
        [ "stats", [ "or", "logical", [ "null", false ] ] ]
    ]);

    defineFunction("LOGEST", logest).args([
        [ "known_y", [ "collect", "number", 1 ] ],
        [ "known_x", [ "collect", "number", 1 ] ],
        [ "const", [ "or", "logical", [ "null", true ] ] ],
        [ "stats", [ "or", "logical", [ "null", false ] ] ]
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

    function expon(x, r, cdf) { // EXPON.DIST(x, lambda, cumulative)
        if (cdf) {
            return 1 - Math.exp(-r*x);
        }
        return r * Math.exp(-r*x);
    }

    function poisson(k, m, cdf) { // POISSON.DIST(x, mean, cumulative)
        if (cdf) {
            return 1 - chisq_left(2*m, 2*(k+1), true);
        }
        //return chisq_left(2*m, 2*k, true) - chisq_left(2*m, 2*(k+1), true);
        var lnf = 0;
        for (var i = 2; i <= k; i++) {
            lnf += Math.log(i); // compute log(k!)
        }
        return Math.exp(k*Math.log(m) - m - lnf);
    }

    function Fdist(x, n, d, cdf) { //F.DIST(x,deg_freedom1,deg_freedom2,cumulative)
        if (cdf) {
            return betastd_cdf(n*x/(d+n*x), n/2, d/2);
        }
        var u = n/d;
        n /= 2; d /= 2;
        return u/BETA(n, d) * Math.pow(u*x, n-1) / Math.pow(1+u*x, n+d);
    }

    function Fdist_right(x, n, d) { // F.DIST.RT(x,deg_freedom1,deg_freedom2)
        return 1 - Fdist(x, n, d, true);
    }

    function Finv_right(p, n, d) { // F.INV.RT(probability,deg_freedom1,deg_freedom2
        return d/n*(1/BETA_INV(p, d/2, n/2, 0, 1) - 1);
    }

    function Finv(p, n, d) { // F.INV(probability,deg_freedom1,deg_freedom2
        return d/n*(1/BETA_INV(1-p, d/2, n/2, 0, 1) - 1);
    }

    function _mean(arr) {
        var me = 0, n = arr.length;
        for (var i = 0; i < n; i++) {
            me += arr[i];
        }
        return me / n;
    }

    function _var_sq(arr, m) { // returns the (n-1)-part of the sum of the squares of deviations from m (= VAR)
        var v = 0, n = arr.length;
        for (var i = 0; i < n; i++) {
            var delta = arr[i] - m;
            v += delta*delta;
        }
        return v / (n-1);
    }

    function Ftest(arr1, arr2) { // F.TEST(array1,array2)
        var n1 = arr1.length - 1, n2 = arr2.length - 1;
        var va1 = _var_sq(arr1, _mean(arr1)),
            va2 = _var_sq(arr2, _mean(arr2));
        if (!va1 || !va2) {
            throw new CalcError("DIV/0");
        }
        return 2*Fdist(va1 / va2, n1, n2, true);
    }

    function fisher(x) { // FISHER(x)
        return 0.5*Math.log((1+x)/(1-x));
    }

    function fisherinv(x) { // FISHERINV(x)
        var e2 = Math.exp(2*x);
        return (e2 - 1)/(e2 + 1);
    }

    function Tdist(x, n, cdf) { // T.DIST(x,deg_freedom, cumulative)
        if (cdf) {
            return 1 - 0.5*betastd_cdf(n/(x*x+n), n/2, 0.5);
        }
        return 1/(Math.sqrt(n)*BETA(0.5, n/2)) * Math.pow(1 + x*x/n, -(n+1)/2);
    }

    function Tdist_right(x, n) { // T.DIST.RT(x,deg_freedom)
        return 1 - Tdist(x, n, true);
    }

    function Tdist_2tail(x, n) { // T.DIST.2T(x,deg_freedom)
        if (x < 0) {
            x = -x;
        }
        return 2*Tdist_right(x, n);
    }

    function Tdist_inv(p, n) { // T.INV(probability,deg_freedom)
        var x = betastd_inv(2*Math.min(p, 1-p), n/2, 0.5); // ibetainv();
        x = Math.sqrt(n * (1 - x) / x);
        return (p > 0.5) ? x : -x;
    }

    function Tdist_2tail_inv(p, n) { // T.INV.2T(probability,deg_freedom)
        // T2 = 2T_r = p => T_r(x,n) = p/2 => 1 - T(x,n,true) = p/2 => x = T^-1(1-p/2, n)
        return Tdist_inv(1-p/2, n);
    }

    function Tdist_test(gr1, gr2, tail, type) { // T.TEST(array1,array2,tails,type)
        var n1 = gr1.length, n2 = gr2.length;
        var t_st, df; // the t-statistic and the "degree of freedom"
        if (type == 1) { // paired (dependent) samples
            var d = 0, d2 = 0;
            for (var i = 0; i < n1; i++) {
                var delta = gr1[i] - gr2[i];
                d += delta;
                d2 += delta*delta;
            }
            var md = d/n1; //, md2 = d2 / n1;
            t_st = md / Math.sqrt((d2 - d*md)/(n1*(n1-1))); // has a "Student T" distribution
            return tail == 1 ? Tdist_right(t_st, n1-1) : Tdist_2tail(t_st, n1-1);
        }
        // unpaired (independent) samples
        var m1 = _mean(gr1), m2 = _mean(gr2),
            v1 = _var_sq(gr1, m1), v2 = _var_sq(gr2, m2);
        if (type == 3) { // unpaired, unequal variances
            var u1 = v1/n1, u2 = v2/n2, u = u1 + u2;
            var q1 = u1/u, q2 = u2/u; // u==0 must be invalidated
            df = 1/(q1*q1/(n1-1) + q2*q2/(n2-1));
            t_st =  f_abs(m1-m2)/Math.sqrt(u);
            return tail == 1 ? Tdist_right(t_st, df) : Tdist_2tail(t_st, df);
        }
        else { // (type == 2) unpaired, equal variances ("equal" in the sense that there is no significant difference in variance in both groups - a prealable F-test could revealed that)
            df = n1 + n2 - 2;
            t_st = f_abs(m1-m2)*Math.sqrt(df*n1*n2/((n1+n2)*((n1-1)*v1+(n2-1)*v2)));
            return tail == 1 ? Tdist_right(t_st, df) : Tdist_2tail(t_st, df);
        }
    }

    function confidence_t(alpha, stddev, size) { // CONFIDENCE.T(alpha,standard_dev,size)
        return -Tdist_inv(alpha/2, size-1)*stddev/Math.sqrt(size);
    }

    function confidence_norm(alpha, stddev, size) { // CONFIDENCE.NORM(alpha,standard_dev,size)
        return -NORM_S_INV(alpha/2)*stddev/Math.sqrt(size);
    }

    function gauss(z) { // GAUSS(z)
        return NORM_S_DIST(z, true) - 0.5;
    }

    function phi(x) { // PHI(x)
        return NORM_S_DIST(x);
    }

    function lognorm_dist(x, m, s, cumulative) { // LOGNORM.DIST(x,mean,standard_dev,cumulative)
        if (cumulative) {
            return 0.5 + 0.5*ERF((Math.log(x)-m)/(s*Math.sqrt(2)));
        }
        var t = Math.log(x)-m;
        return Math.exp(-t*t/(2*s*s))/(x*s*Math.sqrt(2*Math.PI));
    }

    function lognorm_inv(p, m, s) { //LOGNORM.INV(probability, mean, standard_dev)
        return Math.exp(NORM_INV(p, m, s));
    }

    function prob(x_, p_, lw, up) { //PROB(x_range, prob_range, [lower_limit], [upper_limit])
        var n = x_.length;
        var s = 0, i;
        for (i = 0; i < n; i++) {
            if (p_[i] <= 0 || p_[i] > 1) {
                throw new CalcError("NUM");
            }
            s += p_[i];
        }
        if (s != 1) {
            throw new CalcError("NUM");
        }
        var res = 0;
        for (i = 0; i < n; i++) {
            var x = x_[i];
            if (x >= lw && x <= up) {
                res += p_[i];
            }
        }
        return res;
    }

    function slope(y_, x_) { // SLOPE(known_y's, known_x's)
        var mx = _mean(x_), my = _mean(y_), b1 = 0, b2 = 0;
        for (var i = 0, n = y_.length; i < n; i++) {
            var t = x_[i] - mx;
            b1 += t*(y_[i] - my);
            b2 += t*t;
        }
        return b1/b2;
    }

    function intercept(y_, x_) { // INTERCEPT(known_y's, known_x's)
        var mx = _mean(x_), my = _mean(y_);
        // return my - mx*slope(y_, x_);  //but repeating the calls for _mean()
        var b1 = 0, b2 = 0;
        for (var i = 0, n = y_.length; i < n; i++) {
            var t = x_[i] - mx;
            b1 += t*(y_[i] - my);
            b2 += t*t;
        }
        return my - b1*mx/b2;
    }

    function pearson(x_, y_) { // PEARSON(array1, array2)
        var mx = _mean(x_), my = _mean(y_);
        var s1 = 0, s2 = 0, s3 = 0;
        for(var i = 0, n = x_.length; i < n; i++) {
            var t1 = x_[i] - mx, t2 = y_[i] - my;
            s1 += t1*t2;
            s2 += t1*t1;
            s3 += t2*t2;
        }
        return s1/Math.sqrt(s2*s3);
    }

    function rsq(x_, y_) { // RSQ(known_y's,known_x's)
        var r = pearson(x_, y_);
        return r*r;
    }

    function steyx(y_, x_) { //STEYX(known_y's, known_x's)
        var n = x_.length;
        var mx = _mean(x_), my = _mean(y_);
        var s1 = 0, s2 = 0, s3 = 0;
        for (var i = 0; i < n; i++) {
            var t1 = x_[i] - mx, t2 = y_[i] - my;
            s1 += t2*t2;
            s2 += t1*t2;
            s3 += t1*t1;
        }
        return Math.sqrt((s1 - s2*s2/s3)/(n-2));
    }

    function forecast(x, y_, x_) { //FORECAST(x, known_y's, known_x's)
        var mx = _mean(x_), my = _mean(y_);
        var s1 = 0, s2 = 0;
        for (var i = 0, n = x_.length; i < n; i++) {
            var t1 = x_[i] - mx, t2 = y_[i] - my;
            s1 += t1*t2;
            s2 += t1*t1;
        }
        if (s2 === 0) {
            throw new CalcError("N/A");
        }
        var b = s1/s2, a = my - b*mx;
        return a + b*x;
    }

    function _mat_mean(Mat) { // returns the mean value of a Matrix(n, 1)
        var n = Mat.height, sum = 0;
        for (var i=0; i < n; i++) {
            sum += Mat.data[i][0];
        }
        return sum/n;
    }

    function _mat_devsq(Mat, mean) { // returns the sum of squares of deviations for a Matrix(n, 1)
        var n = Mat.height, sq = 0;
        for (var i=0; i < n; i++) {
            var x = Mat.data[i][0] - mean;
            sq += x*x;
        }
        return sq;
    }

    function _def_known(dim) { // returns [[1,2,3,...,dim]]
        var tmp = [];
        for (var i=1; i <= dim; i++) {
            tmp.push(i);
        }
        return [tmp];
    }

    function linest(known_Y, known_X, _const, stats) { // LINEST(known_y's, [known_x's], [const], [stats])
        // known_Y is an JS-array of numbers; known-X is an JS-array of JS_arrays of numbers.
        var n = known_Y.length;
        if (known_X.length > 0) {
            known_X = [ known_X ];
        } else {
            known_X = _def_known(n); // Excel: "If known_x's is omitted, it is assumed to be the array {1,2,3,...}"
        }
        var k = known_X.length;
        var i;

        var Y = new Matrix(this), X = new Matrix(this);
        Y.data = [known_Y];
        Y.width = n; Y.height = 1;
        Y = Y.transpose();
        X.data = known_X;
        X.width = n; X.height = k;
        X = X.transpose();

        if (_const) { // adding 1's column is unnecessary when _const==false (meaning that y_intercept==0)
            for (i=0; i < n; i++) { // add a 1's first column
                X.data[i].unshift(1);
            }
            X.width ++;
        }

        var Xt = X.transpose();
        var B = Xt.multiply(X).inverse().multiply(Xt).multiply(Y); // the last square estimate of the coefficients
        var line_1 = [];
        for (i = B.height-1; i >= 0; i--) {
            line_1.push(B.data[i][0]); // regression coefficients ('slopes') and the y_intercept
        }
        if (!_const) {
            line_1.push(0); // display 0 for y_intercept, when _const==false
        }
        if (!stats) {
            return [ line_1 ]; // don't display statistics about the regression, when stats==false
        }

        var Y1 = X.multiply(B); // the predicted Y values
        var y_y1 = Y.adds(Y1, true); // the errors of the predictions (= Y - Y1)
        var mp = !_const? 0 : _mat_mean(Y1);
        var SSreg = _mat_devsq(Y1, mp); // The regression sum of squares
        var me = !_const? 0 : _mat_mean(y_y1);
        var SSresid = _mat_devsq(y_y1, me); // The residual sum of squares
        var line_5 = [];
        line_5.push(SSreg, SSresid);
        var R2 = SSreg / (SSreg + SSresid); // The coefficient of determination
        var degfre = Y.height - X.width; // The degrees of freedom
        var err_est = Math.sqrt(SSresid / degfre); // The standard error for the y estimate
        var line_3 = [];
        line_3.push(R2, err_est);
        var F_sta = !_const ? (R2/X.width)/((1-R2)/(degfre)) : (SSreg/(X.width-1))/(SSresid/degfre); // The F statistic
        var line_4 = [];
        line_4.push(F_sta, degfre);
        var SCP = Xt.multiply(X).inverse();
        var line_2 = [];
        for (i=SCP.height-1; i >= 0; i--) { // The standard errors (of coefficients an y-intercept)
            line_2.push(Math.sqrt(SCP.data[i][i]*SSresid/degfre));
        }
        return [line_1, line_2, line_3, line_4, line_5];
    }

    function logest(Y_, X_, _const, stats) { // LOGEST(known_y's, [known_x's], [const], [stats])
        var i, n;
        for (i = 0, n = Y_.length; i < n; i++) {
            Y_[i] = Math.log(Y_[i]);
        }
        var result = linest(Y_, X_, _const, stats);
        for (i = 0, n = result[0].length; i < n; i++) {
            result[0][i] = Math.exp(result[0][i]);
        }
        return result;
    }

    /*
      [1] Handbook of Mathematical Functions (NIST, 1964-2010):
      https://en.wikipedia.org/wiki/Abramowitz_and_Stegun
      http://dlmf.nist.gov/
      http://www.aip.de/groups/soe/local/numres/

      [2] https://en.wikibooks.org/wiki/Statistics/Numerical_Methods/Numerics_in_Excel
    */

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
