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

Wallet.Transaction = {};
Wallet.Transaction.Create = {
    init: function(config) {
        var self = this;
        this.submitBtnId =  config.submitBtnId;
        this.msgElement = $('#message');

        $(this.submitBtnId).on('click', function(e) {
            self.create();
        });
    },

    create: function() {
        var address = $('#qrcode_address').val();
        var amount = $('#qrcode_amount').val();
        var label = $('#qrcode_label').val();
        var message = $('#qrcode_message').val();

        if (!address || !amount) {
            this.msgElement.removeClass();
            this.msgElement.addClass('error');
            this.msgElement.html('Address and amount are required');
            return;
        }

        if (isNaN(amount)) {
            this.msgElement.removeClass();
            this.msgElement.addClass('error');
            this.msgElement.html('Amount has to be a number');
            return;   
        }

        var msg = "bitcoin:" + address + "?amount=" + amount + "&label=" + label + "&message=" + message;

        console.log(msg);
        if (!this.qrcode) {
            this.qrcode = new QRCode(document.getElementById("qrcode"), {
                text: msg,
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        } else {
            this.qrcode.makeCode(msg)
        }

        this.msgElement.removeClass();
        this.msgElement.addClass('success');
        this.msgElement.html('All good');
    }


}