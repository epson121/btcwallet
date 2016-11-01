Wallet = {};

Wallet.Address = {};
Wallet.Address.Generator = {

    init: function(options) {
        self = this;
        this.generateBtnId = options.generateBtnId;
        this.exportBtnId = options.exportBtnId;
        this.scanBtnId = options.scanBtnId;
        this.privateKeyId = options.privateKeyId;
        this.publicKeyId = options.publicKeyId;
        this.qrcodesId = options.qrcodesId;

        $(this.generateBtnId).on('click', function(e) {
            self.generate();
        });

        $(this.exportBtnId).on('click', function(e) {
            self.export();
        });

        $(this.scanBtnId).on('click', function(e) {
            self.scan();
        });
    },

    generate: function() {
        var keyPair = bitcoin.ECPair.makeRandom();
        $(this.publicKeyId).val(keyPair.getAddress());
        $(this.privateKeyId).val(keyPair.toWIF());
        $(this.exportBtnId).removeClass('disabled');
        $(this.scanBtnId).removeClass('disabled');
    },

    export: function() {
        var filename = "wallet.wif";
        // var a = document.getElementById("a");
        var wif = $(this.privateKeyId).val();
        if (wif) {
            var file = new Blob([wif], {type: 'text/plain'});
            var href = URL.createObjectURL(file);
            $('#download').html("<a href='" + href + "' download='" + filename + "'>Download WIF private key</a>");
        } else {
            alert('Generate key first.');
        }
    },

    scan: function() {
        var key = $(this.privateKeyId).val();
        var address = $(this.publicKeyId).val();
        if (key || address) {
            var scanElement = document.getElementById('scan');
            var addresElement = document.getElementById('address');
            if (this.scanQRCode || this.addressQrCode) {
                this.scanQRCode.makeCode(key)
                this.addressQrCode.makeCode(address)
            } else {
                this.scanQRCode = new QRCode(scanElement, {
                    text: key,
                    width: 128,
                    height: 128,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.M
                });

                this.addressQrCode = new QRCode(addresElement, {
                    text: address,
                    width: 128,
                    height: 128,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.M
                });
            }
            $(this.qrcodesId).removeClass('hidden');
        } else {
            alert("Generate key first");
        }
    }
}