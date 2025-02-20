// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {
    struct Certificate {
        string email;
        string pdfHash;
        string dob;
        address issuer;
    }

    mapping(bytes32 => Certificate) private certificates;

    event CertificateCreated(
        uint256 blockNumber,
        bytes32 uniqueHash,
        string email,
        string pdfHash,
        string dob,
        address issuer
    );

    function createCertificate(
        string memory email,
        string memory pdfHash,
        string memory dob
    ) public returns (uint256, bytes32) {
        bytes32 uniqueHash = keccak256(abi.encodePacked(email, dob, pdfHash, msg.sender));
        certificates[uniqueHash] = Certificate(email, pdfHash, dob, msg.sender);
        uint256 blockNumber = block.number;

        emit CertificateCreated(blockNumber, uniqueHash, email, pdfHash, dob, msg.sender);

        return (blockNumber, uniqueHash);
    }

    function getCertificate(bytes32 uniqueHash) public view returns (
        string memory email,
        string memory pdfHash,
        string memory dob,
        address issuer
    ) {
        require(bytes(certificates[uniqueHash].pdfHash).length > 0, "Certificate not found");
        Certificate memory cert = certificates[uniqueHash];
        return (cert.email, cert.pdfHash, cert.dob, cert.issuer);
    }
}
