// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockCRV is ERC20 {
    constructor() ERC20("Fake CRV", "FAKECRV") {
        _mint(msg.sender, 100000000 ether);
    }
}