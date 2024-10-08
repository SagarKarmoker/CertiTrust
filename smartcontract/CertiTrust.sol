// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CertiTrust is ERC721, Ownable {
    struct Certificate {
        string id; // Certificate ID as a string
        string ipfsHash; // IPFS hash pointing to the metadata
    }

    mapping(string => Certificate) public certificates;
    mapping(string => bool) public validCertificates;
    uint private certificateCounter;

    constructor() ERC721("CertiTrustCertificate", "CTC") {}

    // Function to mint a new certificate with metadata stored on IPFS
    function requestCertificate(string memory _ipfsHash, address student) public onlyOwner {
        string memory certificateId = generateCertificateId(certificateCounter);
        certificates[certificateId] = Certificate({
            id: certificateId,
            ipfsHash: _ipfsHash
        });
        validCertificates[certificateId] = false;
        _mint(student, certificateId);
        certificateCounter++;
    }

    // Helper function to generate a unique certificate ID as a string
    function generateCertificateId(uint _counter) private view returns (string memory) {
        return string(abi.encodePacked("CTC-", Strings.toString(_counter)));
    }

    // Function for issuers to validate a certificate
    function issueCertificate(string memory _certificateId) public onlyOwner {
        require(ownerOf(_certificateId) != address(0), "Certificate does not exist");
        require(!validCertificates[_certificateId], "Certificate already valid");
        validCertificates[_certificateId] = true;
    }

    // Detailed function for anyone to verify the validity of a certificate
    function verifyCertificateDetails(string memory _certificateId) public view returns (bool isValid, string memory id, string memory ipfsHash) {
        require(bytes(certificates[_certificateId].id).length > 0, "Certificate does not exist");
        Certificate memory cert = certificates[_certificateId];
        return (validCertificates[_certificateId], cert.id, cert.ipfsHash);
    }
}
