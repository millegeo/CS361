import argostranslate.package
import argostranslate.translate


def translate(textToTranslate):

    from_code = 'en'
    to_code = 'es'

    argostranslate.package.update_package_index()
    available_pacakges = argostranslate.package.get_available_packages()
    package_to_install = next(
        filter(
            lambda x: x.from_code == from_code and x.to_code == to_code, available_pacakges
        )
    )
    argostranslate.package.install_from_path(package_to_install.download())

    translatedText = argostranslate.translate.translate(textToTranslate, from_code, to_code)
    print(translatedText)

if __name__ == '__main__':
    translate("My name is Geoff, Yes Geoff")
